import { isDevMode } from '@angular/core';
import { Subject } from 'rxjs';

export class SelectionModel<T> {
  private _selection = new Set<T>();
  private _deselectedToEmit: T[] = [];
  private _selectedToEmit: T[] = [];
  private _selected?: T[] | null = null;

  public get selected(): T[] {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }

    return this._selected;
  }

  public readonly changed = new Subject<SelectionChange<T>>();

  constructor(
    private _multiSelect = false,
    initiallySelectedValues?: T[],
    private _emitChanges = true,
    public compareWith?: (o1: T, o2: T) => boolean,
  ) {
    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiSelect) {
        initiallySelectedValues.forEach((value) => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }

      // Clear the array in order to avoid firing the change event for preselected values.
      this._selectedToEmit = [];
    }
  }

  public select(...values: T[]): boolean | void {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._markSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }

  public deselect(...values: T[]): boolean | void {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }

  public setSelection(...values: T[]): boolean | void {
    this._verifyValueAssignment(values);
    const oldValues = this.selected;
    const newSelectedSet = new Set(values);
    values.forEach((value) => this._markSelected(value));
    oldValues
      .filter((value) => !newSelectedSet.has(this._getConcreteValue(value, newSelectedSet)))
      .forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }

  public toggle(value: T): boolean | void {
    return this.isSelected(value) ? this.deselect(value) : this.select(value);
  }

  public clear(flushEvent = true): boolean | void {
    this._unmarkAll();
    const changed = this._hasQueuedChanges();
    if (flushEvent) {
      this._emitChangeEvent();
    }
    return changed;
  }

  public isSelected(value: T): boolean {
    return this._selection.has(this._getConcreteValue(value));
  }

  public isEmpty(): boolean {
    return this._selection.size === 0;
  }

  public hasValue(): boolean {
    return !this.isEmpty();
  }

  public sort(predicate?: (a: T, b: T) => number): void {
    if (this._multiSelect && this.selected) {
      this._selected!.sort(predicate);
    }
  }

  public isMultipleSelection(): boolean {
    return this._multiSelect;
  }

  private _emitChangeEvent(): void {
    // Clear the selected values so they can be re-cached.
    this._selected = null;

    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit,
      });

      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }

  private _markSelected(value: T): void {
    const concreteValue = this._getConcreteValue(value);
    if (!this.isSelected(concreteValue)) {
      if (!this._multiSelect) {
        this._unmarkAll();
      }

      if (!this.isSelected(concreteValue)) {
        this._selection.add(concreteValue);
      }

      if (this._emitChanges) {
        this._selectedToEmit.push(concreteValue);
      }
    }
  }

  /** Deselects a value. */
  private _unmarkSelected(value: T): void {
    const concreteValue = this._getConcreteValue(value);
    if (this.isSelected(concreteValue)) {
      this._selection.delete(concreteValue);

      if (this._emitChanges) {
        this._deselectedToEmit.push(concreteValue);
      }
    }
  }

  /** Clears out the selected values. */
  private _unmarkAll(): void {
    if (!this.isEmpty()) {
      this._selection.forEach((value) => this._unmarkSelected(value));
    }
  }

  private _verifyValueAssignment(values: T[]): void {
    if (values.length > 1 && !this._multiSelect && isDevMode()) {
      throw new Error('Cannot pass multiple values into SelectionModel with single-value mode.');
    }
  }

  private _hasQueuedChanges(): boolean {
    return Boolean(this._deselectedToEmit.length || this._selectedToEmit.length);
  }

  private _getConcreteValue(inputValue: T, selection?: Set<T>): T {
    if (!this.compareWith) {
      return inputValue;
    } else {
      const safeSelection = selection ?? this._selection;
      for (const selectedValue of safeSelection) {
        if (this.compareWith(inputValue, selectedValue)) {
          return selectedValue;
        }
      }
      return inputValue;
    }
  }
}

export interface SelectionChange<T> {
  source: SelectionModel<T>
  added: T[]
  removed: T[]
}

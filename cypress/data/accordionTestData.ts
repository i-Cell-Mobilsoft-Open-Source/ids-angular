const accordionTestData = {
    allModes: ["filled", "text"] as const,
    allSizes: ["compact", "comfortable", "spacious", "dense"] as const,

    //Colors
    basicColor: 'rgb(33, 53, 71)',
    filledColor: 'rgb(51, 65, 85)',
    textColor: 'rgb(2, 6, 23)',
    white: "rgba(255, 255, 255, 0)",
    dividingLine: '0px solid rgb(229, 231, 235)',
    borderColor: 'rgb(229, 231, 235)',
    black: 'rgb(0, 0, 0)',
    //sizes

    fontStyle: 'normal',
    fontWeight: '600',

    allFontSize: [{
        compact: "12px",
        comfortable: "16px",
        spacious: "16px",
        dense: '12px',
    }],

    allLineHeight: [{
        compact: "16px",
        comfortable: "20px",
        spacious: "20px",
        dense: '16px',
    }],
    allLetterSpacing: [{
        compact: '0.5px',
        comfortable: '0.1px',
        spacious: '0.1px',
        dense: '0.5px',
    }],
    allGap: [{
        compact: '2px',
        comfortable: '8px',
        spacious: '16px',
        dense: '16px',
    }],
    allPadding: [{
        compact: '8px',
        comfortable: '10px',
        spacious: '16px',
        dense: '16px',
    }],
    fontWeightText: '400',
    fontSizeText: '16px',
    lineHeightText: '24px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignButtonItems: 'normal',

    radius: '0px',
    padding: '0px',
    gap: '0px',

}

export default accordionTestData;
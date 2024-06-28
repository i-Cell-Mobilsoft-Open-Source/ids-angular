const actionPanelTestData = {
  allModes: ["filled", "outlined", "elevated"] as const,
  allSizes: ["compact", "comfortable", "spacious", "dense"] as const,
  allVariants: ["light", "surface"] as const,

  //common
  display: 'flex',
  width: '356px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  //colors
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  filledBorderColor: 'rgb(229, 231, 235)',
  outlinedBorderColor: 'rgb(203, 213, 225)',
  elevatedBorderColor: 'rgb(229, 231, 235)',
  //sizes
  allWidth: [{
    compact: "356px",
    comfortable: '356px',
    spacious: '356px',
    dense: '356px'
  }],
  allRadius: [{
    compact: "16px",
    comfortable: '24px',
    spacious: '32px',
    dense: '32px'
  }],
  allPadding: [{
    compact: "8px",
    comfortable: '10px',
    spacious: '16px',
    dense: '16px'
  }],
  allGap: [{
    compact: "8px",
    comfortable: '12px',
    spacious: '16px',
    dense: '16px'
  }],
  boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
  elevatedBoxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  outlineBoxShadow: 'rgba(0, 0, 0, 0.10) 0px 1px 2px 0px',

}

export default actionPanelTestData;
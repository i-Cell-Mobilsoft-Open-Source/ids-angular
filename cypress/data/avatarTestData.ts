const avatarTestData = {
    allModes: ["filled", "outlined", "text"] as const,
    allSizes: [
      "compact",
      "comfortable",
      "spacious",
    ] as const,
    allVariants: [
      "surface",
      "primary",
      "secondary",
      "light",
      "dark"
    ] as const,

  //bgColors
  enabledBgColors: [{
    surface: "rgb(241, 245, 249)",
    primary: "rgb(0, 60, 255)",
    secondary: "rgb(100, 116, 139)",
    light: "rgb(255, 255, 255)",
    dark: "rgb(2, 6, 23)",
  }],
    hoveredBgColors: [{
    surface: "rgb(226, 232, 240)",
    primary: "rgb(0, 47, 189)",
    secondary: "rgb(51, 65, 85)",
    light: "rgb(241, 245, 249)",
    dark: "rgb(30, 41, 59)",
  }],
  focusedBgColors: [{
    surface: "rgb(226, 232, 240)",
    primary: "rgb(0, 60, 255)",
    secondary: "rgb(100, 116, 139)",
    light: "rgb(255, 255, 255)",
    dark: "rgb(30, 41, 59)",
  }],
  activeBgColors: [{
    surface: "rgb(203, 213, 225)",
    primary: "rgb(0, 36, 143)",
    secondary: "rgb(30, 41, 59)",
    light: "rgb(226, 232, 240)",
    dark: "rgb(51, 65, 85)",
  }],

  //textColors
  enabledColors: [{
    surface: "rgb(2, 6, 23)",
    primary: "rgb(255, 255, 255)",
    secondary: "rgb(255, 255, 255)",
    light: "rgb(71, 85, 105)",
    dark: "rgb(248, 250, 252)",
  }],
  hoveredColors: [{
    surface: "rgb(2, 6, 23)",
    primary: "rgb(255, 255, 255)",
    secondary: "rgb(255, 255, 255)",
    light: "rgb(71, 85, 105)",
    dark: "rgb(248, 250, 252)",
  }],

  //sizes
  allHeight: [{
    compact: "24px",
    comfortable: "40px",
    spacious: "64px",
  }],
  allWidth: [{
    compact: "24px",
    comfortable: "40px",
    spacious: "64px",
  }],

  paddingBottom: [{
    compact: "4px",
    comfortable: "4px",
    spacious: "6px",
  }],
  paddingLeft: [{
    compact: "4px",
    comfortable: "4px",
    spacious: "6px",
  }],
  paddingRight: [{
    compact: "4px",
    comfortable: "4px",
    spacious: "6px",
  }],
  paddingTop: [{
    compact: "4px",
    comfortable: "4px",
    spacious: "6px",
  }],

  allFontSize: [{
    compact: "11px",
    comfortable: "14px",
    spacious: "22px",
  }],
  allFontWeight: [{
    compact: '500',
    comfortable: '400',
    spacious: '400',
  }],
  allLineHeight: [{
    compact: "16px",
    comfortable: "20px",
    spacious: "28px",
  }],

  common: [{
    display: 'flex',
    fontStyle: 'normal',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }],
  white2: 'rgb(255, 255, 255) solid 3px',
  black: 'rgb(0, 0, 0) solid 3px',
  hoveredTextBgColors: "rgb(241, 245, 249)",
  allRadius: '1000px',
  image:"https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg",



  avatarImageBgcolors: "rgb(0, 60, 255)",

  }

export default avatarTestData;

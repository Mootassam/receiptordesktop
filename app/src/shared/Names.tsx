class Names {
  static generateRandomFullNameFromJapanese() {
    const surnames = [
      "田中",
      "山田",
      "鈴木",
      "高橋",
      "佐藤",
      "小林",
      "伊藤",
      "中村",
      "加藤",
      "松本",
      "佐々木",
      "渡辺",
      "井上",
      "田村",
      "山口",
      "高木",
      "鈴木",
      "中島",
      "小川",
      "吉田",
      "青木",
      "杉山",
      "加納",
      "佐野",
      "川口",
      "村田",
      "高田",
      "西村",
      "中川",
      "小野",
      "林",
      "村上",
      "大野",
      "金子",
      "中西",
      "森",
      "岡田",
      "平野",
      "和田",
      "野口",
      "松田",
      "松浦",
      "木村",
      "望月",
      "橋本",
      "福田",
      "本田",
      "前田",
      "岡本",
      "北村",
      "小島",
      "杉本",
    ];

    const givenNames = [
      "美咲",
      "さくら",
      "あやか",
      "ゆうな",
      "ゆめ",
      "まどか",
      "かな",
      "りん",
      "みずき",
      "あい",
      "太郎",
      "健太",
      "隆",
      "明彦",
      "勇気",
      "浩二",
      "剛",
      "智也",
      "翔太",
      "健太郎",
      "真子",
      "一郎",
      "悠馬",
      "優子",
      "真紀",
      "夏美",
      "俊介",
      "和也",
      "由美",
      "純一",
      "麻美",
      "裕介",
      "恵美",
      "亮介",
      "麗子",
      "大輝",
      "美香",
      "修平",
      "愛美",
      "哲也",
      "千代子",
      "良太",
      "佳子",
      "英一",
      "舞子",
      "健",
      "友美",
      "拓也",
      "綾香",
      "直樹",
    ];

    const randomSurnameIndex = Math.floor(Math.random() * surnames.length);
    const randomGivenNameIndex = Math.floor(Math.random() * givenNames.length);

    const randomSurname = surnames[randomSurnameIndex];
    const randomGivenName = givenNames[randomGivenNameIndex];

    const fullName = randomSurname + " " + randomGivenName;
    return fullName;
  }

  static generateRandomFullName = () => {
    const firstNames = [
      "Chung",
      "Hoi",
      "Ka",
      "Lai",
      "Man",
      "Pak",
      "Siu",
      "Wai",
      "Yan",
      "Yiu",
    ];
    const lastNames = [
      "Chan",
      "Cheung",
      "Ho",
      "Lau",
      "Lee",
      "Leung",
      "Ng",
      "Wong",
      "Yau",
      "Yu",
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const numAsterisks = Math.floor(Math.random() * 4) + 1; // Generate a random number between 1 and 6
    const num2Asterisks = Math.floor(Math.random() * 4) + 1; // Generate a random number between 1 and 6

    const abbreviatedFirstName =
      firstName.slice(0, 1) + "*".repeat(numAsterisks);
    const abbreviatedLastName =
      lastName.slice(0, 1) + "*".repeat(num2Asterisks);

    const fullName =
      Math.random() < 0.5
        ? `${firstName} ${lastName}`
        : ` YU ${abbreviatedLastName} ${abbreviatedFirstName}`;

    return fullName;
  };

  static generateRandomSignal() {
    const texts = ["4G", "5G", "LTE"];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  }

  static generateRandomCharacter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters.charAt(randomIndex);
    return randomCharacter;
  }
  static genereateRandomCharacter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters.charAt(randomIndex);
    return randomCharacter;
  }

  static generateRandomName() {
    const firstNames = [
      "Chung",
      "Hoi",
      "Ka",
      "Lai",
      "Man",
      "Pak",
      "Siu",
      "Wai",
      "Yan",
      "Yiu",
    ];
    const lastNames = [
      "Chan",
      "Cheung",
      "Ho",
      "Lau",
      "Lee",
      "Leung",
      "Ng",
      "Wong",
      "Yau",
      "Yu",
    ];
    const thirdNames = [
      "Chow ",
      "Lam",
      "Luk",
      "Ma",
      "Ngai",
      "Poon",
      "Shek",
      "Sin",
      "So",
      "Tang",
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const thirdName = lastNames[Math.floor(Math.random() * thirdNames.length)];

    const numAsterisks1 = Math.floor(Math.random() * 3) + 1; // Random number of asterisks (1 to 6)
    const numAsterisks2 = Math.floor(Math.random() * 5) + 1; // Random number of asterisks (1 to 4)
    const formattedName = `${firstName} ${lastName.charAt(0)}${"*".repeat(
      numAsterisks1
    )} ${thirdName.charAt(0)}${"*".repeat(numAsterisks2)}`;

    return formattedName;
  }

  static generateRandomNames() {
    const firstNames = ["Murray", "David", "Catherine", "Samuel"];
    const lastNames = ["Doe", "Smith", "Johnson", "Brown"];

    const getRandomElement = (array) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    const formatName = (name) => {
      const formattedName = name.split("").map((char, index) => {
        if (index === 0) {
          return char;
        }
        return "*";
      });
      return formattedName.join("");
    };

    const randomFirstName = getRandomElement(firstNames);
    const randomLastName = getRandomElement(lastNames);
    const formattedFirstName = formatName(randomFirstName);
    const formattedLastName = formatName(randomLastName);

    return `${formattedFirstName} ${formattedLastName}`;
  }

  static randomName() {
    const names = [
      "Samantha",
      "Ethan",
      "Chloe",
      "Ryan",
      "Emily",
      "Joshua",
      "Grace",
      "Adrian",
      "Isabella",
      "Nathan",
      "Olivia",
      "Lucas",
      "Sophia",
      "Daniel",
      "Ava",
      "Jack",
      "Emma",
      "Jayden",
      "Mia",
      "Matthew",
      "Leo",
      "Vivian",
      "Justin",
      "Ella",
      "Andrew",
      "Lily",
      "Aaron",
      "Zoe",
      "Alex",
      "Charlotte",
      "Oscar",
      "Sarah",
      "Jason",
      "Alice",
      "Kevin",
      "Hannah",
      "Eric",
      "Amelia",
      "Tony",
      "Natalie",
      "Brian",
      "Catherine",
      "Samuel",
      "Evelyn",
      "David",
      "Victoria",
      "Michael",
      "Jasmine",
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    return randomName;
  }


  static generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 27; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  static Randomaly() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 31; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  static Randomaly3() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  static generateRandomString10() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
}

export default Names;

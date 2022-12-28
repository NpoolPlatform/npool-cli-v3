export interface Message {
  ID: string;
  AppName: string;
  LangID: string;
  Lang: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
  Disabled: boolean;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface MessageReq {
  ID: string;
  AppID: string;
  LangID: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
  Disabled: boolean;
}

export interface Country {
  ID: string;
  Country: string;
  Flag: string;
  Code: string;
  Short: string;
  CreatedAt: number;
  UpdatedAt: number;
}


export interface CountryReq {
  ID?: string;
  Country: string;
  Flag: string;
  Code: string;
  Short: string;
}

export interface AppCountry {
  ID: string;
  AppID: string;
  AppName: string;
  CountryID: string;
  Country: string;
  Flag: string;
  Code: string;
  Short: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface Lang {
  ID: string;
  Lang: string;
  Logo: string;
  Name: string;
  Short: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface LangReq {
  ID: string;
  Lang: string;
  Logo: string;
  Name: string;
  Short: string;
}

export interface AppLang {
  ID: string;
  AppID: string;
  AppName: string;
  LangID: string;
  Lang: string;
  Logo: string;
  Name: string;
  Short: string;
  Main: boolean;
  CreatedAt: number;
  UpdatedAt: number;
}


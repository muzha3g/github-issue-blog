// 設定使用者做驗證的方式，aka 用哪種第三方帳號登入

// 引入要使用的第三方登入 Privider
import GithubProvider from "next-auth/providers/github";
// 用 typescript 寫的話要引入這個型別來註記 options 的型別
import type { NextAuthOptions } from "next-auth";

// 開始設定 options，這邊語法可參考 nextauth 的文件 & Dave gray & FCC video (這個還有設定 callback 跟一個 profile(profile))
export const options: NextAuthOptions = {
  // 處理 next-auth JWEDecryptionFailed
  // secret: process.env.NEXTAUTH_SECRET,

  // 設定要用的第三方 provider，會是一個 array
  providers: [
    GithubProvider({
      clientId: <string>process.env.GITHUB_ID,
      clientSecret: <string>process.env.GITHUB_SECRET,
      // 設定 scope 是 repo ，可以抓到存取 repo & user 資料
      authorization: { params: { scope: ["repo", "user"].join(" ") } },
    }),
  ],
};

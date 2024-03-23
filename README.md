## 作業需求

丹尼爾是一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。他已使用 GitHub Issue 寫部落格一段時間,但發現這樣做有些明顯的缺點,不只是顯示上比較侷限,文章也比較不容易被搜尋引擎排到前面。因此他決定串接 GitHub API 並使用 React.js 開發一個網頁,讓搜尋引擎更容易尋找到他在 GitHub Issue 上寫出的文章,並調整成自己喜歡的樣式,希望熟悉前端的你能幫助他完成這個專案。

## 題目描述

串接 GitHub API,讓作者在登入後能夠「瀏覽」、「新增」、「更新」Blog 文章,「瀏覽」留言;非作者僅能「瀏覽」Blog 文章
及「瀏覽」留言。

## 功能

✅ GitHub Login

- 請串接 GitHub OAuth,讓使用者有權限操作 GitHub API

✅ Post Management

- 請將 GitHub Issue 作為 Post,以 GitHub Issue 實作, 並將 close Issu 視為刪除 Post

✅ User Interface

- 列表頁
  - 第一次只能載入 10 筆
  - 每當列表滾到底部時要需要自動發送 API 請求,並載入額外 10 筆,直到沒有更多文章
- 文章頁
  - 顯示文章內容,並正確 render 出 markdown 的內容
  - 使用者可以在此「編輯」、「刪除」
- 新增 / 編輯文章時,可以使用 Modal 或跳轉至新的頁面操作
  - 至少需要使用 title 和 body 兩個欄位
  - 表單驗證:title 為必填,body 至少需要 30 字

## 加分條件

✅ 使用 TypeScript  
✅ 使用 Next.js + App Router  
✅ 有處理錯誤及例外狀況 (Error Handling)  
✅ 有部署至線上環境  
❌ 調校 Web Vitals 評分 （嘗試中，目前效能如下）
![Alt text](image.png)

## 專案架構設計

```
|   actions.ts
|   favicon.ico
|   globals.css
|   layout.tsx
|   loading.tsx
|   page.tsx
|
+---api
|   \---auth
|       \---[...nextauth]
|               options.ts
|               route.ts
|
+---components
|       BackToHomeBtn.tsx
|       CommentCard.tsx
|       CreateForm.tsx
|       DeleteIssueBtn.tsx
|       EditForm.tsx
|       EditIssueBtn.tsx
|       IssueCard.tsx
|       IssueDetail.tsx
|       Loadmore.tsx
|       Navbar.tsx
|       UserCard.tsx
|
+---create
|       page.tsx
|
+---edit
|   \---[id]
|           page.tsx
|
+---issue
|   \---[id]
|           page.tsx
|
\---profile
        page.tsx
```

- `action.tsx`：放置所有對 issue CRUD、對 comment 進行 read 的 api call function。
- `api folder`：放置關於 oauth 的操作（使用 NextAuth 來做身份驗證 + 授權）。
- `components folder`：放置不同頁面會用到的元件，除了 `LoadMore.tsx` 外，每個元件都是 server components，只有需要用到 useEffect + useState hook 的 `LoadMore.tsx` 是 client component。
- `create & profile folder`：創建新 issue 時會跳轉過去的 route & 登入後的個人頁面 route
- `edit & issue folder`：動態的 route，若有多個 issue 時，就會跳轉該 issue id 的 route 去。

## 啟動專案

1. 在本機電腦開一個新資料夾，打開 VSCode，把剛剛建立的資料夾拖進 VScode 的視窗。

2. 在 VSCode 的 terminal 下這兩個指令：`git init`、 `git clone https://github.com/muzha3g/github-issue-blog.git`，專案 clone 到本機後，再下指令 `npm i` 把專案會用的 package 下載下來。（請先確定本機已有下載 git & node.js）

3. 創建 github OAuth app。github 首頁 navbar 最右邊的圓形個人圖片點下去>>setting>>Developer Settings>>OAuth Apps>>New Auth App，HomePage URL 跟 Authorization callback URL 分別填入：`https://localhost:3000`、`https://localhost:3000/api/auth/callback/github`。

4. 回到 VSCode，將 `.env.local.example` 改名為 `.env.local`，按照上述檔案中每一行變數前面的註記說明，將以下變數填入相對應的資訊：
   `NEXT_PUBLIC_GITHUB_OWNER=
NEXT_PUBLIC_GITHUB_REPO=
NEXT_PUBLIC_GITHUB_TOKEN=
GITHUB_AUTHOR_EMAIL=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=`

5. 一切就緒後，在 VSCode 下指令 `npm run dev`，就能在本地端跑起來專案了 ^o^

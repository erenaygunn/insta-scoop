# Insta Scoop

A lightweight and framework-agnostic package to fetch Instagram media (reels, posts, videos, etc.) using the Instagram Graph API. Simply provide your `account_id` and `access_token` to retrieve all media content from your account effortlessly. Caching is supported to reduce API requests and improve performance.

## Installation

```sh
npm install insta-scoop
```

## Usage

### 1. Create a `.env` file

Store your credentials securely in a `.env` file:

```env
INSTAGRAM_ACCOUNT_ID=your-instagram-id
INSTAGRAM_ACCESS_TOKEN=your-access-token
```

### 2. Use the package in your code

```js
import { getInstagramMedia } from "insta-scoop";
import dotenv from "dotenv";

dotenv.config();

const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

async function getInstagramData() {
	try {
		const media = await getInstagramMedia({ accountId, accessToken });
		console.log(media);
	} catch (error) {
		console.error("Error fetching Instagram data:", error);
	}
}

getInstagramData();
```

## How to Retrieve `account_id` and `access_token`

### 1. Create a Facebook Developer App

- Go to [Facebook Developer Platform](https://developers.facebook.com/)
- Create a new app and choose **Other** as the app type
- On the next screen, select **Business** and proceed

### 2. Set Up Instagram API

- Once your app is created, navigate to the **Dashboard**
- Click on **Instagram** and press **Set Up**

### 3. Link Your Instagram Account

- Under the **Generate Access Tokens** section, click **Add Account**
- Log in to the Instagram account you want to retrieve data from
- After logging in, you will see a numeric **account ID** below the username. Save this value

### 4. Generate an Access Token

- In the **Access Token** section, click **Generate Token**
- Log in again to confirm and retrieve the generated token
- Copy and store the **access token** securely

### 5. Verify the Access Token (Optional)

- Visit: [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
- Enter your token to check if it is valid and active

## License

MIT

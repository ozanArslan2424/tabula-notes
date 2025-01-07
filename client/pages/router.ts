import { createBrowserRouter } from "react-router";
import { ErrorPage } from "./_error";
import { ChangePasswordPage } from "./change-password";
import { ForgotPasswordPage } from "./forgot-password";
import { LoginPage } from "./login";
import { NotePage } from "./note";
import { NoteIdPage } from "./note/:id";
import { ProfilePage } from "./profile";
import { RegisterPage } from "./register";
import { LandingPage } from "./root";
import { TopLayout } from "./top.layout";
import { VerifyEmailPage } from "./verify-email";

export const router = createBrowserRouter([
	{
		Component: TopLayout,
		ErrorBoundary: ErrorPage,
		children: [
			{ path: "/", Component: LandingPage },
			{ path: "/login", Component: LoginPage },
			{ path: "/register", Component: RegisterPage },
			{ path: "/profile", Component: ProfilePage },
			{ path: "/forgot-password", Component: ForgotPasswordPage },
			{ path: "/change-password", Component: ChangePasswordPage },
			{ path: "/verify-email", Component: VerifyEmailPage },
			{ path: "/note", Component: NotePage },
			{ path: "/note/:id", Component: NoteIdPage },
		],
	},
]);

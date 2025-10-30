import { signInGitHubAction, signInGoogleAction } from "../_lib/actions";

function SignInButton({ provider }: { provider: string }) {
  const upperFirstLetter = provider[0].toUpperCase() + provider.slice(1);

  return (
    <form
      action={provider === "google" ? signInGoogleAction : signInGitHubAction}
    >
      <button
        type="submit"
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer"
      >
        <img
          src={`https://authjs.dev/img/providers/${provider}.svg`}
          alt={`${upperFirstLetter} logo`}
          height="24"
          width="24"
        />
        <span>Continue with {upperFirstLetter}</span>
      </button>
    </form>
  );
}

export default SignInButton;

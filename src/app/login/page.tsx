import { AuthForm } from "@/components/AuthComponents/AuthForm";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";

export default function LoginPage() {
  return (
    <Section>
      <SectionTitle preTitle="Welcome back" title="Sign in" align="center">
        Please enter your credentials to continue
      </SectionTitle>

      <AuthForm mode="login" />
    </Section>
  );
}

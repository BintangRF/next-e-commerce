import { AuthForm } from "@/components/AuthComponents/AuthForm";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";

export default function RegisterPage() {
  return (
    <Section>
      <SectionTitle preTitle="Join us" title="Create an account">
        Sign up to order.
      </SectionTitle>

      <AuthForm mode="register" />
    </Section>
  );
}

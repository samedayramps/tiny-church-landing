import type { RequestHandler } from "@builder.io/qwik-city";
import { Resend } from "resend";
import { welcomeEmailTemplate } from "~/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "589aac68-2790-486e-bb58-20218cf66f5e";

interface SubscribeBody {
  email: string;
}

export const onPost: RequestHandler = async ({ json, parseBody, env }) => {
  try {
    const body = await parseBody() as SubscribeBody;
    
    if (!body.email || typeof body.email !== 'string') {
      throw new Error("Email is required");
    }

    const email = body.email.trim().toLowerCase();

    // Add to Resend audience
    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    // Send welcome email with the template
    await resend.emails.send({
      from: "Tiny Church <donotreply@tinychurch.app>",
      to: email,
      subject: "Welcome to Tiny Church",
      html: welcomeEmailTemplate(email),
      tags: [
        {
          name: "email_type",
          value: "welcome_email"
        }
      ],
      headers: {
        "List-Unsubscribe": `<mailto:unsubscribe@tinychurch.app?subject=unsubscribe>, <${env.get('NEXT_PUBLIC_UNSUBSCRIBE_URL')}?email=${encodeURIComponent(email)}>`,
      }
    });

    json(200, { success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    
    json(400, { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to subscribe" 
    });
  }
}; 
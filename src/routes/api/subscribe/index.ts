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
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Audience ID:', AUDIENCE_ID);

    const body = await parseBody() as SubscribeBody;
    
    if (!body.email || typeof body.email !== 'string') {
      throw new Error("Email is required");
    }

    const email = body.email.trim().toLowerCase();
    
    try {
      const contactResponse = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
      
      console.log('Contact creation response:', contactResponse);
    } catch (contactError) {
      console.error('Contact creation error:', contactError);
      // If the contact already exists, we can continue
      if ((contactError as Error).message.includes('already exists')) {
        console.log('Contact already exists, continuing...');
      } else {
        throw contactError;
      }
    }

    try {
      // Send welcome email with error catching
      const emailResponse = await resend.emails.send({
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
      
      console.log('Email send response:', emailResponse);
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // If email fails, we still want to return success for the subscription
      console.log('Email failed but subscription succeeded');
    }

    json(200, { success: true });
  } catch (error) {
    console.error('Subscription error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    json(400, { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to subscribe" 
    });
  }
}; 
import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export default publicProcedure
  .input(contactSchema)
  .mutation(async ({ input }) => {
    try {
      // Using SendGrid API
      const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
      const TO_EMAIL = "gcschwab1@msn.com"; // Your email address
      
      if (!SENDGRID_API_KEY) {
        console.log('=== EMAIL NOTIFICATION (SendGrid not configured) ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Name:', input.name);
        console.log('Email:', input.email);
        console.log('Company:', input.company || 'Not provided');
        console.log('Message:', input.message);
        console.log('=====================================');
        
        return {
          success: true,
          message: "Thank you for your message. We'll get back to you shortly at " + input.email,
        };
      }

      const emailData = {
        personalizations: [
          {
            to: [{ email: TO_EMAIL }],
            subject: `New Contact Form Submission from ${input.name}`,
          },
        ],
        from: { email: "noreply@schwablighthouse.com", name: "Schwab Lighthouse Advisory" },
        content: [
          {
            type: "text/html",
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${input.name}</p>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Company:</strong> ${input.company || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <p>${input.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><em>Submitted at: ${new Date().toISOString()}</em></p>
            `,
          },
        ],
      };

      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("SendGrid error:", response.status, errorText);
        throw new Error("Failed to send email");
      }

      console.log("Email sent successfully via SendGrid");
      
      return {
        success: true,
        message: "Thank you for your message. We'll get back to you shortly at " + input.email,
      };
    } catch (error) {
      console.error("Email sending error:", error);
      
      // Fallback: Log to console for manual processing
      console.log('=== EMAIL NOTIFICATION (Fallback) ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Name:', input.name);
      console.log('Email:', input.email);
      console.log('Company:', input.company || 'Not provided');
      console.log('Message:', input.message);
      console.log('=====================================');
      
      return {
        success: true,
        message: "Thank you for your message. We'll get back to you shortly at " + input.email,
      };
    }
  });
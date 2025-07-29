import { Resend } from "resend";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company") || "Not provided";
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response("Invalid email format", { status: 400 });
    }

    // Here you would integrate with your email service
    // For now, we'll just log the data and return success
    console.log("Contact form submission:", {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString(),
    });

    // Force immediate error if no API key
    if (!process.env.RESEND_API_KEY) {
      return new Response("RESEND_API_KEY environment variable not found", { status: 500 });
    }
    
    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      return new Response("Invalid RESEND_API_KEY format", { status: 500 });
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
      const emailResult = await resend.emails.send({
        from: "Garfish Digital <onboarding@resend.dev>",
        to: "services@garfishdigital.com",
        subject: `New contact from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      
      console.log("Resend response:", emailResult);
    } catch (emailError) {
      console.error("Resend error:", emailError);
      return new Response(`Email sending failed: ${emailError.message}`, { status: 500 });
    }

    // Return success response
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response("Server error", { status: 500 });
  }
}

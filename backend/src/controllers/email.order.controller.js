/*import { sendEmail }
from "../services/email.service.js";

const sendOrderEmail = async (req, res) => {

    try {

        const {
            email,
            username,
            orderId,
            totalAmount
        } = req.body;

        await sendEmail(

            email,

            "Order Confirmation",

            `
                <h2>
                    Thank you ${username}
                </h2>

                <p>
                    Your order has been placed.
                </p>

                <p>
                    Order ID:
                    <strong>${orderId}</strong>
                </p>

                <p>
                    Total:
                    $${totalAmount}
                </p>
            `
        );

        res.status(200).json({

            success: true,

            message:
                "Email sent successfully"
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};

export {
    sendOrderEmail
};*/
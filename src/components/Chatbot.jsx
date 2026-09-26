import { useEffect, useState } from "react";

function Chatbot() {

    const [chatbotData, setChatbotData] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [userInput, setUserInput] = useState("");



    const [messages, setMessages] = useState([
        {
            text: "Hi! 👋 How can I help you today?",
            sender: "bot"
        }
    ]);


    useEffect(() => {

        fetch("/chatbot.json")

            .then((response) => {

                if (!response.ok) {
                    throw new Error(
                        "Could not load chatbot.json"
                    );
                }

                return response.json();

            })

            .then((data) => {

                setChatbotData(data);

                console.log(
                    "Chatbot data loaded successfully"
                );

            })

            .catch((error) => {

                console.error(
                    "Error loading chatbot data:",
                    error
                );

            });

    }, []);




    function getBotResponse(userMessage) {

        if (chatbotData.length === 0) {

            return "Please wait, I'm loading my information...";

        }


        const message =
            userMessage.toLowerCase().trim();


        let bestMatch = null;
        let highestScore = 0;


        chatbotData.forEach((item) => {

            let score = 0;


        

            if (item.patterns) {

                item.patterns.forEach((pattern) => {

                    const patternText =
                        pattern.toLowerCase().trim();

                    if (
                        message.includes(patternText)
                    ) {

                        score += 20;

                    }

                });

            }


      

            if (item.keywords) {

                item.keywords.forEach((keyword) => {

                    const keywordText =
                        keyword.toLowerCase().trim();

                    if (
                        message.includes(keywordText)
                    ) {

                        score +=
                            keywordText.split(" ").length * 5;

                    }

                });

            }


     

            const question =
                item.question ||
                item.Question ||
                "";


            if (question) {

                const questionWords =
                    question
                        .toLowerCase()
                        .replace(/[?!.]/g, "")
                        .split(/\s+/);


                questionWords.forEach((word) => {

                    if (
                        word.length > 2 &&
                        message.includes(word)
                    ) {

                        score += 2;

                    }

                });

            }


        

            if (score > highestScore) {

                highestScore = score;
                bestMatch = item;

            }

        });


 
        if (bestMatch) {

            let answer =
                bestMatch.response ||
                bestMatch.answer;


            // Your greetings response is an array
            if (Array.isArray(answer)) {

                answer = answer[0];

            }


            if (answer) {

                return answer;

            }

        }


        return "Sorry, I didn't understand that. Please ask me about markets, vegetables, delivery, orders, locations or opening hours.";

    }


   

    function sendMessage() {

        const message =
            userInput.trim();


        if (message === "") {
            return;
        }


        // User message

        setMessages((previousMessages) => [

            ...previousMessages,

            {
                text: message,
                sender: "user"
            }

        ]);


        // Clear input

        setUserInput("");


        // Bot response

        setTimeout(() => {

            const response =
                getBotResponse(message);


            setMessages((previousMessages) => [

                ...previousMessages,

                {
                    text: response,
                    sender: "bot"
                }

            ]);

        }, 500);

    }



    function askQuestion(question) {

        setMessages((previousMessages) => [

            ...previousMessages,

            {
                text: question,
                sender: "user"
            }

        ]);


        setTimeout(() => {

            const response =
                getBotResponse(question);


            setMessages((previousMessages) => [

                ...previousMessages,

                {
                    text: response,
                    sender: "bot"
                }

            ]);

        }, 400);

    }


   

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }




    return (

        <>

            {/* CHAT BUTTON */}

            <button
                className="chatbot-button"
                onClick={() => setIsOpen(true)}
            >
                💬
            </button>


            {/* CHATBOT */}

            <div
                className={`chatbot ${
                    isOpen ? "active" : ""
                }`}
            >


                {/* HEADER */}

                <div className="chatbot-header">

                    <div>

                        <h3>🥬 Fresh Find</h3>

                        <span>
                            Online Assistant
                        </span>

                    </div>


                    <button
                        className="close-button"
                        onClick={() =>
                            setIsOpen(false)
                        }
                    >
                        ×
                    </button>

                </div>


                {/* MESSAGES */}

                <div className="chat-messages">

                    {messages.map(
                        (message, index) => (

                            <div
                                key={index}
                                className={`message ${
                                    message.sender === "user"
                                        ? "user-message"
                                        : "bot-message"
                                }`}
                            >

                                {message.text}

                            </div>

                        )
                    )}

                </div>


                {/* QUICK QUESTIONS */}

                <div className="quick-questions">

                    <button
                        onClick={() =>
                            askQuestion(
                                "Do you deliver?"
                            )
                        }
                    >
                        🚚 Delivery
                    </button>


                    <button
                        onClick={() =>
                            askQuestion(
                                "What vegetables do you have?"
                            )
                        }
                    >
                        🥬 Vegetables
                    </button>


                    <button
                        onClick={() =>
                            askQuestion(
                                "What are your opening hours?"
                            )
                        }
                    >
                        🕐 Opening Hours
                    </button>

                </div>


                {/* INPUT */}

                <div className="chat-input">

                    <input
                        type="text"
                        value={userInput}
                        onChange={(event) =>
                            setUserInput(
                                event.target.value
                            )
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Type your question..."
                        autoComplete="off"
                    />


                    <button
                        onClick={sendMessage}
                    >
                        ➤
                    </button>

                </div>

            </div>

        </>

    );
}


export default Chatbot;
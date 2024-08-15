import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { socket } = useSocketContext();

	const emitMessageToArea = ({ message, areaId, senderId, receiverId }) => {
		socket.emit("sendMessageToArea", {
			message,
			areaId,
			senderId,
			receiverId,
		});
	};

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(
				`/api/messages/send/${selectedConversation._id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message }),
				}
			);
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			// Emit the message to the server
			emitMessageToArea({
				message: data.message,
				areaId: selectedConversation._id,
				senderId: data.senderId,
				receiverId: data.receiverId,
			});

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;

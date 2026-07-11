import { useState } from "react";
import { X, Mail } from "lucide-react";

function BulkEmailModal({
  open,
  onClose,
  recipients = [],
  onSend,
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!subject.trim()) {
      alert("Enter Subject");
      return;
    }

    if (!message.trim()) {
      alert("Enter Message");
      return;
    }

    onSend({
      recipients,
      subject,
      message,
    });

    setSubject("");
    setMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">

        <div className="flex justify-between items-center border-b p-5">

          <div className="flex items-center gap-2">
            <Mail className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Bulk Email
            </h2>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-5">

          <p className="font-medium mb-2">
            Recipients ({recipients.length})
          </p>

          <div className="border rounded-lg p-3 h-28 overflow-auto text-sm bg-gray-50 mb-4">

            {recipients.map((email) => (
              <div key={email}>{email}</div>
            ))}

          </div>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />

          <textarea
            rows={8}
            className="w-full border rounded-lg p-3"
            placeholder="Write email..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

        </div>

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send Email
          </button>

        </div>

      </div>

    </div>
  );
}

export default BulkEmailModal;
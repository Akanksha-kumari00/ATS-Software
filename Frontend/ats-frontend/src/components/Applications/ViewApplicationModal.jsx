export default function ViewApplicationModal({
open,
onClose,
application
}) {
if (!open || !application)
return null;
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-[500px] rounded-xl p-6">
                    <div className="flex justify-between mb-5">
                        <h2 className="text-xl font-bold">
                            Application Details
                        </h2>
                        <button onClick={onClose}>
                        ✖
                        </button>
                    </div>
                    <div className="space-y-3">
                        <p>
                        <b>Name:</b>
                            {application.candidate_name}
                        </p>
                        <p>
                        <b>Email:</b>
                            {application.email}
                        </p>
                        <p>
                        <b>Mobile:</b>
                            {application.mobile}
                        </p>
                        <p>
                        <b>Hospital:</b>
                            {application.hospital_name}
                        </p>
                        <p>
                        <b>Status:</b>
                            {application.status}
                        </p>
                    </div>
            </div>
        </div>
    );
}
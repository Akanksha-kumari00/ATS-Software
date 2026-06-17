import { FaPlus, FaSearch } from "react-icons/fa";

function Interview() {

  return (

    <div className="p-5">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">

          Interview Management

        </h2>

        <button

          className="bg-blue-600 text-white px-4 py-2 rounded-lg"

        >

          <FaPlus className="inline mr-2" />

          Schedule Interview

        </button>

      </div>

      <div className="mb-5">

        <div className="relative">

          <FaSearch

            className="absolute top-3 left-3 text-gray-400"

          />

          <input

            type="text"

            placeholder="Search Candidate"

            className="w-80 border rounded-lg py-2 pl-10 pr-3"

          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-4">

                Date

              </th>

              <th className="text-left p-4">

                Candidate

              </th>

              <th className="text-left p-4">

                Hospital

              </th>

              <th className="text-left p-4">

                Time

              </th>

              <th className="text-left p-4">

                Status

              </th>

            </tr>

          </thead>

          <tbody>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Interview;
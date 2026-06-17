
/*import {
  FaUsers,
  FaFileAlt,
  FaCalendarAlt,
  FaGift,
  FaUserCheck
} from "react-icons/fa";

function StatsCards({ stats }) {

  const cards = [

    {
      title: "Total Candidates",
      value: stats?.totalCandidates || 0,
      icon: <FaUsers />,
      bg: "bg-green-500",
    },

    {
      title: "New Candidates",
      value: stats?.newCandidates || 0,
      icon: <FaFileAlt />,
      bg: "bg-purple-500",
    },

    {
      title: "Interviews",
      value: stats?.interviewCandidates || 0,
      icon: <FaCalendarAlt />,
      bg: "bg-yellow-500",
    },

    {
      title: "Selected",
      value: stats?.selectedCandidates || 0,
      icon: <FaGift />,
      bg: "bg-teal-500",
    },

    {
      title: "Rejected",
      value: stats?.rejectedCandidates || 0,
      icon: <FaUserCheck />,
      bg: "bg-red-500",
    }

  ];

  return (

    <div className="grid grid-cols-5 gap-3 mt-3">

      {cards.map((card) => (

        <div

          key={card.title}

          className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100 h-24"

        >

          <div

            className={`${card.bg} w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm shrink-0`}

          >

            {card.icon}

          </div>

          <div className="min-w-0">

            <p className="text-gray-500 text-xs font-medium">

              {card.title}

            </p>

            <h4 className="text-2xl font-bold text-gray-800">

              {card.value}

            </h4>

          </div>

        </div>

      ))}

    </div>

  );

}

export default StatsCards;*/
import {
  FaUsers,
  FaFileAlt,
  FaCalendarAlt,
  FaGift,
  FaUserCheck
} from "react-icons/fa";

function StatsCards({ stats }) {

  const cards = [

    {
      title: "Total Candidates",
      value: stats?.totalCandidates || 0,
      icon: <FaUsers />,
      bg: "bg-green-500",
    },

    {
      title: "New Candidates",
      value: stats?.newCandidates || 0,
      icon: <FaFileAlt />,
      bg: "bg-purple-500",
    },

    {
      title: "Interviews",
      value: stats?.interviewCandidates || 0,
      icon: <FaCalendarAlt />,
      bg: "bg-yellow-500",
    },

    {
      title: "Selected",
      value: stats?.selectedCandidates || 0,
      icon: <FaGift />,
      bg: "bg-teal-500",
    },

    {
      title: "Rejected",
      value: stats?.rejectedCandidates || 0,
      icon: <FaUserCheck />,
      bg: "bg-red-500",
    }

  ];

  return (

    <div className="grid grid-cols-5 gap-2 mt-1">

      {

        cards.map((card) => (

          <div

            key={card.title}

            className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm border border-gray-100 h-20"

          >

            <div

              className={`${card.bg} w-8 h-8 rounded-md flex items-center justify-center text-white text-xs shrink-0`}

            >

              {card.icon}

            </div>

            <div className="min-w-0">

              <p className="text-[11px] text-gray-500 font-medium truncate">

                {card.title}

              </p>

              <h4 className="text-xl font-bold text-gray-800">

                {card.value}

              </h4>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default StatsCards;

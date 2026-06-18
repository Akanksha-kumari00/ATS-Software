import { useState } from "react";

import {
  FaFilter,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

function CandidateFilters() {

  const initialState = {

    speciality: "",

    experience: "",

    location: [],

    hiringStage: []

  };

  const [filters, setFilters] = useState(initialState);

  const [open, setOpen] = useState({

    speciality: true,

    experience: true,

    location: true,

    hiring: true

  });

  const toggleSection = (name) => {

    setOpen({

      ...open,

      [name]: !open[name]

    });

  };

  const handleMultiSelect = (value, field) => {

    const exists = filters[field].includes(value);

    if (exists) {

      setFilters({

        ...filters,

        [field]: filters[field].filter(

          (item) => item !== value

        )

      });

    }

    else {

      setFilters({

        ...filters,

        [field]: [

          ...filters[field],

          value

        ]

      });

    }

  };

  const resetFilters = () => {

    setFilters(initialState);

  };

  return (

    <div className="bg-white rounded-2xl shadow p-5">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-2">

          <FaFilter className="text-blue-600"/>

          <h2 className="font-semibold text-lg">

            Filters

          </h2>

        </div>

        <button

          onClick={resetFilters}

          className="text-blue-600 text-sm"

        >

          Reset

        </button>

      </div>

      {/* Speciality */}

      <div className="mb-4">

        <div

          onClick={() => toggleSection("speciality")}

          className="flex justify-between cursor-pointer mb-2"

        >

          <h4 className="font-medium">

            Speciality

          </h4>

          {

            open.speciality

            ?

            <FaChevronUp />

            :

            <FaChevronDown />

          }

        </div>

        {

          open.speciality && (

            <select

              value={filters.speciality}

              onChange={(e)=>

              setFilters({

                ...filters,

                speciality:e.target.value

              })}

              className="w-full border rounded-xl p-3"

            >

              <option value="">

                All

              </option>

              <option>

                Cardiologist

              </option>

              <option>

                Neurologist

              </option>

              <option>

                Orthopedic

              </option>

              <option>

                Pediatrician

              </option>

              <option>

                Radiologist

              </option>

            </select>

          )

        }

      </div>

      {/* Experience */}

      <div className="mb-4">

        <div

          onClick={() => toggleSection("experience")}

          className="flex justify-between cursor-pointer mb-2"

        >

          <h4 className="font-medium">

            Experience

          </h4>

          {

            open.experience

            ?

            <FaChevronUp />

            :

            <FaChevronDown />

          }

        </div>

        {

          open.experience && (

            <select

              value={filters.experience}

              onChange={(e)=>

              setFilters({

                ...filters,

                experience:e.target.value

              })}

              className="w-full border rounded-xl p-3"

            >

              <option value="">

                All

              </option>

              <option>

                0-2 Years

              </option>

              <option>

                3-5 Years

              </option>

              <option>

                5-10 Years

              </option>

              <option>

                10+ Years

              </option>

            </select>

          )

        }

      </div>

      {/* Location */}

      <div className="mb-4">

        <div

          onClick={() => toggleSection("location")}

          className="flex justify-between cursor-pointer mb-2"

        >

          <h4 className="font-medium">

            Location

          </h4>

          {

            open.location

            ?

            <FaChevronUp />

            :

            <FaChevronDown />

          }

        </div>

        {

          open.location && (

            <div className="space-y-2">

              {

                [

                  "Delhi",

                  "Mumbai",

                  "Bangalore",

                  "Hyderabad"

                ].map((city)=>(

                  <label

                    key={city}

                    className="flex gap-2"

                  >

                    <input

                      type="checkbox"

                      checked={filters.location.includes(city)}

                      onChange={()=>

                      handleMultiSelect(

                        city,

                        "location"

                      )}

                    />

                    {city}

                  </label>

                ))

              }

            </div>

          )

        }

      </div>

      {/* Hiring Stage */}

      <div className="mb-6">

        <div

          onClick={() => toggleSection("hiring")}

          className="flex justify-between cursor-pointer mb-2"

        >

          <h4 className="font-medium">

            Hiring Stage

          </h4>

          {

            open.hiring

            ?

            <FaChevronUp />

            :

            <FaChevronDown />

          }

        </div>

        {

          open.hiring && (

            <div className="space-y-2">

              {

                [

                  "New",

                  "CV Shared",

                  "Shortlisted",

                  "Interview",

                  "Selected",

                  "Rejected"

                ].map((stage)=>(

                  <label

                    key={stage}

                    className="flex gap-2"

                  >

                    <input

                      type="checkbox"

                      checked={filters.hiringStage.includes(stage)}

                      onChange={()=>

                      handleMultiSelect(

                        stage,

                        "hiringStage"

                      )}

                    />

                    {stage}

                  </label>

                ))

              }

            </div>

          )

        }

      </div>

      {/* Apply */}

      <button

        className="w-full bg-blue-600 text-white py-3 rounded-xl"

      >

        Apply Filters

      </button>

    </div>

  );

}

export default CandidateFilters;
import { Checkbox } from "../../../components/ui/checkbox"

export default function AsideFilter() {

const data = [
  { name: "Event Type",
    props:[
      {
        id: "workshops",
        label:"Workshops",
      },
      {
        id: "meeting",
        label:"Meeting",
      },
      {
        id: "seminar",
        label:"Seminar",
      }
    ]
  },
  { name: "Event Type",
    props:[
      {
        id: "workshops",
        label:"Workshops",
      },
      {
        id: "meeting",
        label:"Meeting",
      },
      {
        id: "seminar",
        label:"Seminar",
      }
    ]
  },
  { name: "Event Type",
    props:[
      {
        id: "workshops",
        label:"Workshops",
      },
      {
        id: "meeting",
        label:"Meeting",
      },
      {
        id: "seminar",
        label:"Seminar",
      }
    ]
  }
]
  return (
    <div className="border border-black p-3 rounded-md">
      {data.map(({name,props} , index) => (
        <div key={index} className={`border-b border-black pb-3 ${index === data.length - 1 && "border-none"}`}>
          <div className="py-2">
            {name}
          </div>
          {props.map(({id,label}) => (
            <div key={id} className="flex items-center space-x-2 py-1">
              <Checkbox id={id} />
              <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            </div>
          ))
          }
        </div>
      ))}
      <div className="flex justify-end">
        <button className="bg-black w-28 text-white rounded-md">
          Apply Filter
        </button>
      </div>
    </div>
  )
}

<<<<<<< HEAD
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
      <div className="">
        <button className="bg-black w-full p-1.5 text-white rounded-md">
          Apply Filter
        </button>
      </div>
    </div>
  )
=======
import { useFilterEventStudent } from '../hook/useFilterEvent';

export default function AsideFilter() {
  const { register, onSubmitFilter } = useFilterEventStudent();
  const data = [
    {
      name: 'Event Type',
      props: [
        {
          id: 'workshops',
          label: 'Workshops',
        },
        {
          id: 'meeting',
          label: 'Meeting',
        },
        {
          id: 'seminar',
          label: 'Seminar',
        },
      ],
    },
  ];
  const manadatory = [
    {
      name: 'Is Mandatory',
      props: [
        {
          id: 'true',
          label: 'True',
        },
        {
          id: 'false',
          label: 'False',
        },
      ],
    },
  ];

  return (
    <div>
      <form onSubmit={onSubmitFilter}>
        <div className="rounded-md border border-black p-3">
          {data.map(({ name, props }, index) => (
            <div
              key={index}
              className={`border-b border-black pb-3 ${index === data.length - 1 && 'border-none'}`}
            >
              <div className="py-2">{name}</div>
              {props.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id={id}
                    value={id}
                    {...register('EventTypes')}
                  />
                  <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {manadatory.map(({ name, props }, index) => (
            <div
              key={index}
              className={`border-b border-black pb-3 ${index === data.length - 1 && 'border-none'}`}
            >
              <div className="py-2">{name}</div>
              {props.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2 py-1">
                  <input
                    type="radio"
                    id={id}
                    value={id}
                    {...register('IsMandatory')}
                  />
                  <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-black p-1.5 text-white"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
>>>>>>> 76c812b (fix merge)
}

import { useFilterProjectStudent } from '../hook/useFilterProject';

export default function AsideFilter() {
  const { register, onSubmitFilter } = useFilterProjectStudent();
  const data = [
    {
      name: 'Category',
      props: [
        {
          id: 'healthcare',
          label: 'Healthcare',
        },
        {
          id: 'fintech',
          label: 'Fintech',
        },
        {
          id: 'sharingEconomy',
          label: 'Sharing Economy',
        },
        {
          id: 'edtech',
          label: 'Edtech',
        },
        {
          id: 'eCommerce',
          label: 'E-Commerce',
        },
        {
          id: 'saas',
          label: 'SaaS',
        },
        {
          id: 'greenTech',
          label: 'Green Tech',
        },
        {
          id: 'aiAndMachineLearning',
          label: 'AI and Machine Learning',
        },
        {
          id: 'proptech',
          label: 'Proptech',
        },
        {
          id: 'agtech',
          label: 'Agtech',
        },
        {
          id: 'logisticsAndSupplyChain',
          label: 'Logistics and Supply Chain',
        },
        {
          id: 'entertainmentAndMedia',
          label: 'Entertainment and Media',
        },
        {
          id: 'mobility',
          label: 'Mobility',
        },
        {
          id: 'cybersecurity',
          label: 'Cybersecurity',
        },
        {
          id: 'others',
          label: 'Others',
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
                    {...register('projectCategories')}
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
}

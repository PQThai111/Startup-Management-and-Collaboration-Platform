

export default function CreateProject() {
  return (
    <div className='container mb-20 mt-10 px-56 mx-auto'>
      <h1 className="font-bold text-2xl mb-3 text-main">
        Create a Project
      </h1>
      <div className="mb-3">
        <div className="flex justify-start mb-1">
          <p>
            <span className="font-semibold">Leader : </span>
          </p>
          <p> Tui</p>
        </div>

        <div className="my-4 border-b-2 pb-4">
          <p>
          <span className="font-semibold" >Project name:</span>
        </p>
          <input type="text" className="w-[500px] h-[30px] mb-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" Both English name and Vietnamese name of project"/>
        </div>

        <div className="my-4 border-b-2 pb-4">
          <p className="font-semibold">
            Description:
          </p>
          <textarea id="message" className="block p-2.5 w-[500px] h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Write your thoughts here..." defaultValue={""} />

        </div>

        <div className="py-4 my-2 border-b-2">
          <div className="flex ps-4 mb-2">
            <input
              id="bordered-radio-1"
              type="radio"
              name="bordered-radio"
              className="mt-[2px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex flex-col w-full ms-2 space-y-0">
              <label
                htmlFor="bordered-radio-1"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                EXE 1
              </label>
              <p className="text-sm">Mô tả mô tả nè</p>
            </div>
          </div>

          <div className="flex ps-4">
            <input
              id="bordered-radio-1"
              type="radio"
              name="bordered-radio"
              className="mt-[2px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex flex-col w-full ms-2 space-y-0">
              <label
                htmlFor="bordered-radio-1"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                EXE 2
              </label>
              <p className="text-sm">Mô tả mô tả nè</p>
            </div>
          </div>
        </div>
        <div className="py-4 my-2 border-b-2 flex">
          <p>
            <span className="font-semibold" >Cover image : </span>
          </p>
          <input type="file" className="ml-3"/>
        </div>
        <div className="py-4 my-2 border-b-2">
          <p className="font-semibold">
            Desired lecture:
          </p>
          <select id="countries" className="w-[500px] h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      <div>
        <button className="w-20 border-main border-2 text-main font-semibold rounded-sm">
          Create
        </button>
      </div>
    </div>
  )
}

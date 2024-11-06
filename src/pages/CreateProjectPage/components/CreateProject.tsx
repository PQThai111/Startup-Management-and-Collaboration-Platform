export default function CreateProject() {
  return (
    <div className="container mx-auto mt-8 bg-slate-100 px-56 py-5">
      <div className="my-10 rounded-sm border bg-white p-7">
        <h1 className="mb-3 text-2xl font-bold text-main">Create a Project</h1>
        <div className="mb-3 px-3">
          <div className="mb-1 flex justify-start">
            <p>
              <span className="font-semibold">Leader : </span>
            </p>
            <p> Tui</p>
          </div>
          <div className="mb-1 flex justify-start border-b-2">
            <p>
              <span className="font-semibold">Project type: </span>
            </p>
            <p> EXE101 (Experiential Entrepreneurship 1)</p>
          </div>
          <div className="my-2 grid grid-cols-10 border-b-2 py-4">
            <p className="col-span-10 font-semibold">Project domain : </p>
            <div className="col-span-3 mt-2 flex ps-4">
              <input
                id="bordered-radio-1"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-1"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Healthcare
                </label>
              </div>
            </div>

            <div className="col-span-3 mt-2 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Fintech
                </label>
              </div>
            </div>
            <div className="col-span-3 mt-2 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Sharing
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Economy
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Edtech
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  E-commerce
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  SaaS
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  GreenTech
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  AI & Machine Learning
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Proptech
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Agtech
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Logistics & Supply Chain
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Entertainment & Media
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Mobility
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Cybersecurity
                </label>
              </div>
            </div>
            <div className="col-span-3 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Others
                </label>
              </div>
            </div>
          </div>

          <div className="my-4 border-b-2 pb-2">
            <p>
              <span className="font-semibold">Project name:</span>
            </p>
            <div>
              <input
                type="text"
                className="mb-2 h-[30px] w-[500px] rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder=" English name of project"
              />
            </div>
          </div>

          <div className="my-4 border-b-2 pb-4">
            <p className="font-semibold">Description:</p>
            <p className="text-gray-500">
              * The description includes context, problem, solution,
              features,...
            </p>
            <textarea
              id="message"
              className="block h-[200px] w-[500px] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={''}
            />
          </div>

          <div className="my-2 flex border-b-2 py-4">
            <p>
              <span className="font-semibold">Cover image : </span>
            </p>
            <input type="file" className="ml-3" />
          </div>
          <div className="my-2 border-b-2 py-4">
            <p className="font-semibold">Desired lecture:</p>
            <select
              id="countries"
              className="block h-[35px] w-[500px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>Choose a lecturer</option>
              <option value="1">Miss Thảo</option>
              <option value="2">Miss Grand</option>
              <option value="3">Miss Univer</option>
              <option value="4">Mr. Khầy</option>
            </select>
          </div>
        </div>
        <div>
          <button className="mr-5 w-20 rounded-sm border-2 border-main font-semibold text-main">
            Create
          </button>
          <button className="w-20 rounded-sm border-2 border-main bg-main font-semibold text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

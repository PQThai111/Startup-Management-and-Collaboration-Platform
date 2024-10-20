import InputSearch from '../../EventPage/components/InputSearch'
import { ProjectPost, PROJECT_POST_TYPE } from '../../../types/project.type'
// import { useQuery } from '@tanstack/react-query'
import ProjectPostItem from './ProjectItem'

const ProjectItemTest : ProjectPost ={
    id: '1',
    projectName:'Teen Project',
    coverImage: 'https://s3-alpha-sig.figma.com/img/0f72/2667/d6a634bbd4e7c1dfc12adaf9e8ce1984?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PZae~MRFDyeiqgAfKt4RLCHnU5~VtTfmFV7mqTlM1gH9R7oI8ORJFXCcZfRl-H71sOFoMQ~Pl2maVdMMR6ozMIJj-Qb9uXRzpGiWkFgelhVMoh0JY36zO3ZT0zB2ViscAIRuO0XmWGZLOBDs7fcF1Sb~5uOHv8dIjCdIS1QVAj8XZOM4FbD3gW5eRO4Hl8o54iOFbGqHJAfQikZGyv4cJppvIShWwk3mzuis3XhOgLRyig7YVgUn3WPhbe08kVvwttKYbVbM5gwmAkVfXBd-HWyxQ1AAkbwSz~m-cb9zXzzRjvVeTGgztWvNts6ps0yUrCaednr5RjFjGz4eVMwS3w__',
    leader:'tui',
    mentor:'tui',
    lecturer:'tui',
    projectDetails: 'Mo ta ve project, Mo ta ve project, Mo ta ve project',
    description: 'tieu de bai dang muon noi gi noi , tieu de bai dang muon noi gi noi',
    memberWanted:'muon tuyen thanh vien nhu nao',
    endDate: new Date(),
    startDate: new Date(),
    type: PROJECT_POST_TYPE.exe1,
    timeLine: 1,
//    status: TRUE,
}

export default function ProjectPostList() {

  return (
    <div className='container mb-20 px-20 pt-7 mx-auto'>
      <div className=' h-8 mb-5 grid grid-cols-12'>
        <div className="col-span-10">
          <InputSearch/>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-3">
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
          <ProjectPostItem projectPostProps={ProjectItemTest}/>
      </div>
    </div>
  )
}

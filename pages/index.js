import { getMainContentBySlug } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';
import FeatherIcon from '../components/FeatherIcon';
import Quotable from '../components/Quotable';
import { currentYear, numberOfYearsSince } from '../lib/dates';

const HeroSection = ({ hero: { navbar, person } }) => (
  <section className="py-5 md:py-10 md:py-16">
    <div className="container max-w-screen-xl mx-auto px-4">
      <nav className="flex items-center justify-between mb-0 md:mb-20">
        <img className="w-40 -ml-10" src={navbar.logoLink} alt="Logo" />
        <a
          className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md bg-blue-100 hover:bg-gray-700 hover:text-white transition ease-linear duration-500"
          href={navbar.resumeLink}
          download={navbar.resumeTitme}
        >
          {navbar.resumeButtonText}
        </a>
      </nav>

      <div className="text-center">
        <div className="flex justify-center mb-12">
          <div className="inline-block relative w-64 h-64 overflow-hidden rounded-full">
            <img
              className="w-full h-auto filter grayscale"
              src={'/' + person.imageLink}
              alt="face"
            />
          </div>
        </div>

        <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
          {person.name}
        </h6>

        <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">
          {person.title}
        </h1>

        <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
          {person.quote}
        </p>

        <a
          href={person.callToActionLink}
          className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-blue-100 hover:text-gray-700 transition ease-linear duration-500"
        >
          {person.callToAction}
        </a>
      </div>
    </div>
  </section>
);

const SellingPointsSection = ({ sellingPoints }) => (
  <section className="py-10 md:py-16">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellingPoints.map(({ title, text, iconName }) => (
          <div className="bg-gray-50 px-8 py-10 rounded-md" key={title}>
            <div className="w-20 py-6 flex justify-center bg-blue-100 text-gray-500 rounded-md mb-4">
              <FeatherIcon name={iconName} />
            </div>

            <h4 className="font-medium text-gray-700 text-lg mb-4">{title}</h4>

            <p className="font-normal text-gray-500 text-md">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutMeSection = ({ aboutMe }) => {
  const yearOfFirstJob = +aboutMe.education.end + 1;
  const aboutMeHtml = aboutMe.aboutMeHtml.replace(
    '{YEARS_EXP}',
    numberOfYearsSince(yearOfFirstJob) + '+'
  );

  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-10 lg:mb-0">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5 text-center pb-5 md:pb-10">
              {aboutMe.title}
            </h1>

            <div
              className="font-normal text-gray-500 text-md md:text-base space-y-5"
              dangerouslySetInnerHTML={{ __html: aboutMeHtml }}
            />

            <div>
              <h1 className="font-medium text-gray-700 text-2xl md:text-1xl text-center pt-10 pb-5">
                Education
              </h1>

              <div className="max-w-full lg:max-w-lg my-auto lg:my-0 lg:mx-auto">
                <h4 className="font-medium text-gray-700 text-lg mb-4 md:text-left text-center">
                  {aboutMe.education.title}
                </h4>

                <div className="relative mb-2">
                  <div className="flex justify-between">
                    <h6 className="font-semibold text-gray-500 text-md relative z-10">
                      {aboutMe.education.institution}
                    </h6>
                    <h6 className="font-normal text-gray-500 text-sm relative z-10">
                      {`${aboutMe.education.start} — ${aboutMe.education.end}`}
                    </h6>
                  </div>
                </div>

                <p className="font-normal text-gray-500 text-md">
                  {aboutMe.education.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto my-auto text-center">
            <Quotable {...aboutMe.quote} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ experience }) => (
  <section className="py-10 md:py-16">
    <div className="container max-w-screen-xl mx-auto px-4">
      <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
        {experience.title}
      </h1>

      <p className="font-normal text-gray-500 text-sm md:text-base mb-5 md:mb-10">
        {experience.subtitle}
      </p>

      {experience.experienceList.map((exp) => (
        <div
          key={exp.company}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-5"
        >
          <div className="bg-gray-50 px-2 md:px-8 py-3 md:py-8 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="mx-3 lg:mr-10 col-span-1 md:col-span-3 flex flex-col lg:flex-row">
                <div className="rounded-md w-20 h-20 my-auto mx-auto lg:mx-0 lg:mr-5">
                  <img
                    className="rounded-2xl"
                    src={exp.logo}
                    alt="company logo"
                  />
                </div>

                <div className="max-w-full lg:max-w-xs xl:max-w-lg my-auto lg:my-0 mt-5 lg:ml-5">
                  <h4 className="font-medium text-gray-700 text-lg mb-4 md:text-left text-center">
                    {exp.position}
                  </h4>

                  <div className="relative mb-2">
                    <div className="flex justify-between">
                      <h6 className="font-semibold text-gray-500 text-md relative z-10">
                        {exp.company}
                      </h6>
                      <h6 className="font-normal text-gray-500 text-sm relative z-10">
                        {`${exp.start} — ${exp.end}`}
                      </h6>
                    </div>
                  </div>

                  <p className="font-normal text-gray-500 text-md">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 mt-0 lg:mb-0 px-2 md:px-8">
                <h6 className="font-normal text-gray-500 text-sm relative mb-3 mt-6 md:mt-0">
                  Technologies
                </h6>

                <div className="flex flex-row flex-wrap">
                  {exp.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-full py-2 px-3 text-xs text-gray-600 bg-blue-100 mr-1 mb-1 h-8"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({ projects }) => (
  <section className="py-10 md:py-16">
    <div className="container max-w-screen-xl mx-auto px-4">
      <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
        {projects.title}
      </h1>

      <p className="font-normal text-gray-500 text-sm md:text-base mb-5 md:mb-10">
        {projects.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.projectList.map((project) => (
          <div key={project.title} className="bg-gray-50 px-8 py-10 rounded-md">
            <h6 className="font-semibold text-gray-500 text-md  mb-4">
              {project.title + ' '}
              <span className="font-medium text-gray-400 text-sm">
                <a
                  href={project.linkUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {'- ' + project.linkText}
                </a>
              </span>
            </h6>
            <p className="font-normal text-gray-500 text-md">
              {project.description}
            </p>

            <h6 className="font-normal text-gray-500 text-sm relative mb-2 mt-4">
              {project.productUrl ? (
                <a
                  className="text-blue-400"
                  href={project.productUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {project.productName}
                </a>
              ) : (
                project.productName
              )}
            </h6>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactMeFooter = ({ contactMe }) => (
  <footer className="py-10 md:py-16 lg::mb-52">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="text-center">
        <Quotable {...contactMe.quote} />

        <h1 className="font-medium text-gray-700 text-4xl md:text-5xl mb-5 mt-20">
          <a id={contactMe.anchor}>{contactMe.title}</a>
        </h1>

        <p className="font-normal text-gray-400 text-md md:text-lg mb-10">
          {contactMe.subtitle}
        </p>

        <div className="flex items-center justify-center space-x-8">
          {contactMe.linkList.map((link) => (
            <a
              key={link.iconName}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <FeatherIcon
                name={link.iconName}
                className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500"
              />
            </a>
          ))}
          {/*<a*/}
          {/*  href="#"*/}
          {/*  className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"*/}
          {/*>*/}
          {/*  <AtSign className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500" />*/}
          {/*</a>*/}
        </div>
      </div>
    </div>

    <p className="text-gray-700 -mb-5 pt-20">
      &copy; {currentYear()} Carlyle Ruiters
    </p>
  </footer>
);

export const MainContent = ({ content }) => {
  const { hero, projects, contactMe, aboutMe, experience } = content;

  return (
    <div className="px-5 sm:px-10 lg:px-16 bg-gray-100">
      <HeroSection hero={hero} />
      <SellingPointsSection sellingPoints={hero.sellingPoints} />
      <AboutMeSection aboutMe={aboutMe} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <ContactMeFooter contactMe={contactMe} />
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const hero = getMainContentBySlug('hero', [
    'navbar',
    'person',
    'sellingPoints',
  ]);
  const aboutMe = getMainContentBySlug('about-me', [
    'title',
    'imageLink',
    'quote',
    'education',
    'content',
  ]);
  const projects = getMainContentBySlug('projects', [
    'title',
    'subtitle',
    'projectList',
  ]);
  const experience = getMainContentBySlug('experience', [
    'title',
    'subtitle',
    'experienceList',
  ]);
  const contactMe = getMainContentBySlug('contact-me', [
    'anchor',
    'title',
    'subtitle',
    'quote',
    'linkList',
  ]);
  const aboutMeHtml = await markdownToHtml(aboutMe.content || '');

  return {
    props: {
      content: {
        hero,
        projects,
        contactMe,
        experience,
        aboutMe: {
          ...aboutMe,
          aboutMeHtml,
        },
      },
    },
  };
};

export default MainContent;

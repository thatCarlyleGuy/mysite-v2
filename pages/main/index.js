import {
  Activity,
  AtSign,
  CheckCircle,
  DownloadCloud,
  GitHub,
  Linkedin,
} from 'react-feather';
import { getMainContentBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import Canvas from './Canvas';
import { useState } from 'react';

const Icon = ({ name = '' }) => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'check') return <CheckCircle />;
  if (normalizedName === 'download') return <DownloadCloud />;
  if (normalizedName === 'activity') return <Activity />;
  return '';
};

export const Jello = ({ content }) => {
  const { navbar, person, sellingPoints } = content.hero;
  const {
    title: aboutMeTitle,
    imageLink,
    caption,
    aboutMeHtml,
  } = content.aboutMe;

  const radius = 60;
  const angle = 0.02 * Math.PI;
  const calculateRotation = (x, y, angle, centerX, centerY) => {
    const accX = x - centerX;
    const accY = y - centerY;

    const deltaX = accX * Math.cos(angle) - accY * Math.sin(angle);
    const deltaY = accX * Math.sin(angle) + accY * Math.cos(angle);

    return [deltaX + centerX, deltaY + centerY];
  };

  const draw = (ctx, frameCount, state, setState) => {
    const drawCircle = (x, y) => ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.beginPath();

    const [[x, y], [centerX, centerY]] = state;
    const [newCenterX, newCenterY] = [
      centerX + 0.4,
      centerY,
      // 200 + Math.sin(centerX * 0.2) * 50,
    ];
    const [newX, newY] = calculateRotation(x, y, angle, centerX, centerY);
    drawCircle(newCenterX, newCenterY);
    drawCircle(newX, newY);

    setState([
      [newX, newY],
      [newCenterX, newCenterY],
    ]);
    ctx.fill();
  };

  return (
    <div className="px-5 sm:px-10 lg:px-16 bg-gray-100">
      <Canvas
        draw={draw}
        options={{
          defaultData: [
            [200, 200],
            [200 + radius, 200],
          ],
        }}
        width={600}
        height={600}
      />

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <nav className="flex items-center justify-between mb-20">
            <img className="w-40" src={navbar.logoLink} alt="Logo" />

            <button className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">
              {navbar.resumeButtonText}
            </button>
          </nav>

          <div className="text-center">
            <div className="flex justify-center mb-12">
              <div className="inline-block relative w-64 h-64 overflow-hidden rounded-full">
                <img
                  className="w-full h-auto filter grayscale"
                  src={person.imageLink}
                  alt="Image"
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
              href="#"
              className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500"
            >
              {person.callToAction}
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellingPoints.map(({ title, text, iconName }) => (
              <div className="bg-gray-50 px-8 py-10 rounded-md" key={title}>
                <div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                  <Icon name={iconName} />
                </div>

                <h4 className="font-medium text-gray-700 text-lg mb-4">
                  {title}
                </h4>

                <p className="font-normal text-gray-500 text-md">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mb-10 pr-16 lg:mb-0" style={{ maxWidth: '50%' }}>
              <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
                {aboutMeTitle}
              </h1>

              <div
                className="font-normal text-gray-500 text-xs md:text-base space-y-5"
                dangerouslySetInnerHTML={{ __html: aboutMeHtml }}
              />
            </div>

            <div className="space-y-24">
              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  01
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo API Generator
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A dummy data free and documented API generator to facilitate{' '}
                    <br /> the process of testing the front-end portion of
                    projects.
                  </p>
                </div>
              </div>

              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  02
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo API Generator
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A dummy data free and documented API generator to facilitate{' '}
                    <br /> the process of testing the front-end portion of
                    projects.
                  </p>
                </div>
              </div>

              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  03
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo API Generator
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A dummy data free and documented API generator to facilitate{' '}
                    <br /> the process of testing the front-end portion of
                    projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Education
          </h1>

          <p className="font-normal text-gray-500 text-xs md:text-base mb-20">
            Below is a summary of the places I studied
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2015 – 2016
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  See the place here
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-normal text-gray-300 text-3xl md:text-6xl lg:text-7xl mb-20 md:mb-32 lg:mb-48">
              Please do not measure your skills in <br /> percentages!
            </h1>

            <p className="font-medium text-gray-700 text-xs md:text-base">
              In my many years of experience, I use @laravel for backend
              projects and @vuejs for <br /> front-end projects. I’m an avid
              programmer, so I create designs based on the <br /> weekend
              @figmadesign.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Experience
          </h1>

          <p className="font-normal text-gray-500 text-xs md:text-base mb-20">
            Below is a summary of the places I studied
          </p>

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Company
              </h6>

              <p className="font-semibold text-gray-600 text-base">
                Massa Fames{' '}
                <span className="font-normal text-gray-300">/ New York</span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                Massa Fames{' '}
                <span className="font-normal text-gray-300">/ New York</span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                Massa Fames{' '}
                <span className="font-normal text-gray-300">/ New York</span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                Massa Fames{' '}
                <span className="font-normal text-gray-300">/ New York</span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                Massa Fames{' '}
                <span className="font-normal text-gray-300">/ New York</span>
              </p>
            </div>

            <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Position
              </h6>

              <p className="font-normal text-gray-400 text-base">
                Junior Front-End Developer
              </p>

              <p className="font-normal text-gray-400 text-base">
                Junior Front-End Developer
              </p>

              <p className="font-normal text-gray-400 text-base">
                Junior Front-End Developer
              </p>

              <p className="font-normal text-gray-400 text-base">
                Junior Front-End Developer
              </p>

              <p className="font-normal text-gray-400 text-base">
                Junior Front-End Developer
              </p>
            </div>

            <div className="space-y-8 md:space-y-16">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Year
              </h6>

              <p className="font-normal text-gray-400 text-base">2016</p>

              <p className="font-normal text-gray-400 text-base">2016</p>

              <p className="font-normal text-gray-400 text-base">2016</p>

              <p className="font-normal text-gray-400 text-base">2016</p>

              <p className="font-normal text-gray-400 text-base">2016</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Brands
          </h1>

          <p className="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">
            Below is a summary of the places I studied
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <img src="assets/image/brand-1.png" alt="Image" />

            <img src="assets/image/brand-2.png" alt="Image" />

            <img src="assets/image/brand-3.png" alt="Image" />

            <img src="assets/image/brand-4.png" alt="Image" />

            <img src="assets/image/brand-5.png" alt="Image" />

            <img src="assets/image/brand-6.png" alt="Image" />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Testimonial
          </h1>

          <p className="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">
            Below is a summary of the places I studied
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>

            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <p className="font-normal text-gray-500 text-md mb-4">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor <br /> incididunt ut labore et dolore
                magna aliqua.
              </p>

              <h6 className="font-semibold text-gray-500 text-md">
                Stephan Clark{' '}
                <span className="font-medium text-gray-300 text-sm">
                  - CEO at EarlyBird
                </span>
              </h6>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 md:py-16 mb-20 md:mb-40 lg::mb-52">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-medium text-gray-700 text-4xl md:text-5xl mb-5">
              Testimonial
            </h1>

            <p className="font-normal text-gray-400 text-md md:text-lg mb-20">
              I’m not currently taking on new client work but feel free to
              contact me for any <br /> other inquiries.
            </p>

            <div className="flex items-center justify-center space-x-8">
              <a
                href="#"
                className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
              >
                <Linkedin className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500" />
              </a>

              <a
                href="#"
                className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
              >
                <GitHub className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500" />
              </a>

              <a
                href="#"
                className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
              >
                <AtSign className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500" />
              </a>
            </div>
          </div>
        </div>
      </footer>
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
    'caption',
    'content',
  ]);
  const aboutMeHtml = await markdownToHtml(aboutMe.content || '');

  return {
    props: {
      content: {
        hero,
        aboutMe: {
          ...aboutMe,
          aboutMeHtml,
        },
      },
    },
  };
};

export default Jello;

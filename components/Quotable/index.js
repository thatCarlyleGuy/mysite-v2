import Image from 'next/image';

const Quotable = ({ imageUrl, text, author }) => (
  <>
    <div className="inline-block relative w-40 h-40 overflow-hidden rounded-full">
      <Image
        className="w-full h-auto filter grayscale"
        src={'/' + imageUrl}
        alt="quote"
        layout="fill"
      />
    </div>

    <div className="max-w-xs mx-auto">
      <blockquote>
        <h4 className="quotation font-medium text-gray-700 text-lg mb-2">
          {text}
        </h4>
      </blockquote>
      <h6 className="font-semibold italic text-gray-500 text-md relative z-10">
        {author}
      </h6>
    </div>
  </>
);

export default Quotable;

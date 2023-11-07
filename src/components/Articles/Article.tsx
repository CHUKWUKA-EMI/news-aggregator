import { FC } from 'react';
import { TArticle } from '../../types/newsSources';

const Article: FC<TArticle> = ({
  content,
  description,
  imageLink,
  publishedDate,
  source,
  title,
  url
}) => {
  const truncateText = (text: string) => {
    if (text.length <= 200) return text;

    return `${text.slice(0, 201)}`;
  };

  return (
    <div
      role="link"
      onClick={() => window.open(url, '_blank')}
      className={`flex cursor-pointer md:flex-row flex-col overflow-ellipsis sm:w-[46%] md:w-full md:items-start md:h-40 mb-4 sm:mb-6 gap-4`}
    >
      <div className="md:w-[500px] w-full md:h-full h-[50%]">
        <img
          className={`rounded-md ${
            !imageLink ? 'bg-gray-900 dark:bg-black' : ''
          } object-cover w-full h-full`}
          src={imageLink}
          alt={description}
        />
      </div>
      <div className="flex w-full h-full flex-col">
        <p className="font-[600] text-[1rem] md:text-lg text-gray-700 dark:text-white">
          {title}
        </p>
        <span className="text-sm dark:text-gray-400 text-gray-600 font-[400] md:font-[500]">
          {source} |{' '}
          {new Date(publishedDate).toLocaleDateString('en', {
            dateStyle: 'full'
          })}
        </span>
        <p className="dark:text-gray-400 text-sm h-full font-light md:font-normal antialiased font-serif text-gray-500 mt-2">
          {truncateText(content)}
        </p>
      </div>
    </div>
  );
};

export default Article;

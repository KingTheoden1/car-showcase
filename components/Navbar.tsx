import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          <Image
            src='/logo.svg'
            alt='Car Hub Logo'
            width={118}
            height={18}
            className='object-contain dark:invert'
          />
        </Link>

        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <CustomButton
            title='Sign In'
            btnType='button'
            containerStyles='text-primary-blue rounded-full bg-white border border-primary-blue hover:bg-primary-blue hover:text-white transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 min-w-[130px]'
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

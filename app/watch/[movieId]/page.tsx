'use client';

import useMovie from '@/hooks/useMovie';
import { useSession } from 'next-auth/react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });
  const router = useRouter();
  const { movieId } = useParams();
  const { data } = useMovie(movieId as string);
  const video = data?.videos?.results?.filter((result:any)=> result.type=="Trailer")[0]["key"]

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
        fixed w-full p-4 z-10 
        flex flex-row items-center 
        gap-8 bg-black bg-opacity-70
        
      "
      >
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <iframe
        id = "video"
        className="h-full w-full "
        src={`https://www.youtube.com/embed/${video}?autoplay=1&quality=high`}
        allowFullScreen
      ></iframe>
      
    </div>
  );
};

export default Watch;
import { memo } from "react";

const Image = memo(function Image({ src }) {
    return <img src={src} className="w-28 rounded-lg" />;
})

export const PlaylistList = ({data, setPlayingInfo, playing_cda_id}) => {
    return (
        <>
            {data.sort((a,b) => a.p_order - b.p_order).map((x, idx) => {
                return (
                    <div
                        key={x.id}
                        className={`
                            flex items-center
                            w-full
                            py-2 space-x-4
                            px-2
                            overflow-x-hidden
                            ${playing_cda_id === x.cda_id ? 'bg-white bg-opacity-20' : 'hover:bg-opacity-10 hover:bg-white'}
                            cursor-pointer
                        `}
                        onClick={() => setPlayingInfo(x.cda_id, idx)}
                    >
                        <Image src={x.thumb}/>
                        <div className="flex flex-col line-clamp-2">
                            <p className="font-semibold line-clamp-2">{x.title}</p>
                            <p className="line-clamp-1">{x.author}</p>

                        </div>
                    </div>
                )
            })}
        </>
    )
}
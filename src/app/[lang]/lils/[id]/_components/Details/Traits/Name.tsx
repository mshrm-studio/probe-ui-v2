import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Lil/Auction/FromSubgraph';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import { ImageData } from '@noundry/lil-nouns-assets';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    lil?: LilFromDB;
    type: 'accessory' | 'background' | 'body' | 'glasses' | 'head';
}

export default function DetailsTraitsName({ auction, dict, lil, type }: Props) {
    if (lil) {
        if (type === 'accessory') {
            return <>{dict.traits[lil.accessory_name]}</>;
        }

        if (type === 'background') {
            return (
                <>
                    {
                        dict.traits[
                            `background-${
                                lil.background_index == 0 ? 'cool' : 'warm'
                            }`
                        ]
                    }
                </>
            );
        }

        if (type === 'body') {
            return <>{dict.traits[lil.body_name]}</>;
        }

        if (type === 'glasses') {
            return <>{dict.traits[lil.glasses_name]}</>;
        }

        if (type === 'head') {
            return <>{dict.traits[lil.head_name]}</>;
        }
    }

    if (auction) {
        if (type === 'accessory') {
            return (
                <>
                    {
                        dict.traits[
                            ImageData.images.accessories[
                                Number(auction.noun.seed.accessory)
                            ].filename
                        ]
                    }
                </>
            );
        }

        if (type === 'background') {
            return (
                <>
                    {
                        dict.traits[
                            `background-${
                                auction.noun.seed.background == 0
                                    ? 'cool'
                                    : 'warm'
                            }`
                        ]
                    }
                </>
            );
        }

        if (type === 'body') {
            return (
                <>
                    {
                        dict.traits[
                            ImageData.images.bodies[
                                Number(auction.noun.seed.body)
                            ].filename
                        ]
                    }
                </>
            );
        }

        if (type === 'glasses') {
            return (
                <>
                    {
                        dict.traits[
                            ImageData.images.glasses[
                                Number(auction.noun.seed.glasses)
                            ].filename
                        ]
                    }
                </>
            );
        }

        if (type === 'head') {
            return (
                <>
                    {
                        dict.traits[
                            ImageData.images.heads[
                                Number(auction.noun.seed.head)
                            ].filename
                        ]
                    }
                </>
            );
        }
    }

    return <></>;
}

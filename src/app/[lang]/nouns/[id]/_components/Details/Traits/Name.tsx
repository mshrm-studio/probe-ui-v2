import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import { ImageData } from '@noundry/nouns-assets';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
    type: 'accessory' | 'background' | 'body' | 'glasses' | 'head';
}

export default function DetailsTraitsName({
    auction,
    dict,
    noun,
    type,
}: Props) {
    if (noun) {
        if (type === 'accessory') {
            return <>{dict.traits[noun.accessory_name]}</>;
        }

        if (type === 'background') {
            return (
                <>
                    {
                        dict.traits[
                            `background-${
                                noun.background_index == 0 ? 'cool' : 'warm'
                            }`
                        ]
                    }
                </>
            );
        }

        if (type === 'body') {
            return <>{dict.traits[noun.body_name]}</>;
        }

        if (type === 'glasses') {
            return <>{dict.traits[noun.glasses_name]}</>;
        }

        if (type === 'head') {
            return <>{dict.traits[noun.head_name]}</>;
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

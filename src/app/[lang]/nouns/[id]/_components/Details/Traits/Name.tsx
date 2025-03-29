import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { ImageData } from '@noundry/nouns-assets';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
    type: NounTraitLayer;
}

export default function DetailsTraitsName({
    auction,
    dict,
    noun,
    type,
}: Props) {
    if (noun) {
        if (type === NounTraitLayer.Accessory) {
            return <>{dict.traits[noun.accessory_name]}</>;
        }

        if (type === NounTraitLayer.Background) {
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

        if (type === NounTraitLayer.Body) {
            return <>{dict.traits[noun.body_name]}</>;
        }

        if (type === NounTraitLayer.Glasses) {
            return <>{dict.traits[noun.glasses_name]}</>;
        }

        if (type === NounTraitLayer.Head) {
            return <>{dict.traits[noun.head_name]}</>;
        }
    }

    if (auction) {
        if (type === NounTraitLayer.Accessory) {
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

        if (type === NounTraitLayer.Background) {
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

        if (type === NounTraitLayer.Body) {
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

        if (type === NounTraitLayer.Glasses) {
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

        if (type === NounTraitLayer.Head) {
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

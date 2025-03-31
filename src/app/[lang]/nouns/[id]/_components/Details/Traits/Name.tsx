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
    if (auction) {
        if (type === NounTraitLayer.Accessory) {
            return (
                <span data-auction-trait-id={auction.noun.seed.accessory}>
                    {
                        dict.traits[
                            ImageData.images.accessories[
                                Number(auction.noun.seed.accessory)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Background) {
            return (
                <span data-auction-trait-id={auction.noun.seed.background}>
                    {
                        dict.traits[
                            `background-${
                                auction.noun.seed.background == 0
                                    ? 'cool'
                                    : 'warm'
                            }`
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Body) {
            return (
                <span data-auction-trait-id={auction.noun.seed.body}>
                    {
                        dict.traits[
                            ImageData.images.bodies[
                                Number(auction.noun.seed.body)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Glasses) {
            return (
                <span data-auction-trait-id={auction.noun.seed.glasses}>
                    {
                        dict.traits[
                            ImageData.images.glasses[
                                Number(auction.noun.seed.glasses)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Head) {
            return (
                <span data-auction-trait-id={auction.noun.seed.head}>
                    {
                        dict.traits[
                            ImageData.images.heads[
                                Number(auction.noun.seed.head)
                            ].filename
                        ]
                    }
                </span>
            );
        }
    }

    if (noun) {
        if (type === NounTraitLayer.Accessory) {
            return (
                <span data-db-trait-name={noun.accessory_name}>
                    {dict.traits[noun.accessory_name]}
                </span>
            );
        }

        if (type === NounTraitLayer.Background) {
            return (
                <span data-db-trait-id={noun.background_index}>
                    {
                        dict.traits[
                            `background-${
                                noun.background_index == 0 ? 'cool' : 'warm'
                            }`
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Body) {
            return (
                <span data-db-trait-name={noun.body_name}>
                    {dict.traits[noun.body_name]}
                </span>
            );
        }

        if (type === NounTraitLayer.Glasses) {
            return (
                <span data-db-trait-name={noun.glasses_name}>
                    {dict.traits[noun.glasses_name]}
                </span>
            );
        }

        if (type === NounTraitLayer.Head) {
            return (
                <span data-db-trait-name={noun.head_name}>
                    {dict.traits[noun.head_name]}
                </span>
            );
        }
    }

    return null;
}

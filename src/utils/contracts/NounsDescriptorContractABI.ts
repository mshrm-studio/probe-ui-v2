export const nounsDescriptorContractABI = [
    {
        inputs: [
            {
                internalType: 'contract INounsArt',
                name: '_art',
                type: 'address',
            },
            {
                internalType: 'contract ISVGRenderer',
                name: '_renderer',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    { inputs: [], name: 'BadPaletteLength', type: 'error' },
    { inputs: [], name: 'EmptyPalette', type: 'error' },
    { inputs: [], name: 'IndexNotFound', type: 'error' },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'contract INounsArt',
                name: 'art',
                type: 'address',
            },
        ],
        name: 'ArtUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'baseURI',
                type: 'string',
            },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bool',
                name: 'enabled',
                type: 'bool',
            },
        ],
        name: 'DataURIToggled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    { anonymous: false, inputs: [], name: 'PartsLocked', type: 'event' },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'contract ISVGRenderer',
                name: 'renderer',
                type: 'address',
            },
        ],
        name: 'RendererUpdated',
        type: 'event',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'accessories',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'accessoryCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addAccessories',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addAccessoriesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'string', name: '_background', type: 'string' },
        ],
        name: 'addBackground',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addBodies',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addBodiesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addGlasses',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addGlassesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addHeads',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'addHeadsFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string[]',
                name: '_backgrounds',
                type: 'string[]',
            },
        ],
        name: 'addManyBackgrounds',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'arePartsLocked',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'art',
        outputs: [
            { internalType: 'contract INounsArt', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'backgroundCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'backgrounds',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'baseURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'bodies',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'bodyCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            {
                components: [
                    {
                        internalType: 'uint48',
                        name: 'background',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'body', type: 'uint48' },
                    {
                        internalType: 'uint48',
                        name: 'accessory',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'head', type: 'uint48' },
                    { internalType: 'uint48', name: 'glasses', type: 'uint48' },
                ],
                internalType: 'struct INounsSeeder.Seed',
                name: 'seed',
                type: 'tuple',
            },
        ],
        name: 'dataURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint48',
                        name: 'background',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'body', type: 'uint48' },
                    {
                        internalType: 'uint48',
                        name: 'accessory',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'head', type: 'uint48' },
                    { internalType: 'uint48', name: 'glasses', type: 'uint48' },
                ],
                internalType: 'struct INounsSeeder.Seed',
                name: 'seed',
                type: 'tuple',
            },
        ],
        name: 'generateSVGImage',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'description', type: 'string' },
            {
                components: [
                    {
                        internalType: 'uint48',
                        name: 'background',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'body', type: 'uint48' },
                    {
                        internalType: 'uint48',
                        name: 'accessory',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'head', type: 'uint48' },
                    { internalType: 'uint48', name: 'glasses', type: 'uint48' },
                ],
                internalType: 'struct INounsSeeder.Seed',
                name: 'seed',
                type: 'tuple',
            },
        ],
        name: 'genericDataURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint48',
                        name: 'background',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'body', type: 'uint48' },
                    {
                        internalType: 'uint48',
                        name: 'accessory',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'head', type: 'uint48' },
                    { internalType: 'uint48', name: 'glasses', type: 'uint48' },
                ],
                internalType: 'struct INounsSeeder.Seed',
                name: 'seed',
                type: 'tuple',
            },
        ],
        name: 'getPartsForSeed',
        outputs: [
            {
                components: [
                    { internalType: 'bytes', name: 'image', type: 'bytes' },
                    { internalType: 'bytes', name: 'palette', type: 'bytes' },
                ],
                internalType: 'struct ISVGRenderer.Part[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'glasses',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'glassesCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'headCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'heads',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isDataURIEnabled',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'lockParts',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint8', name: 'index', type: 'uint8' }],
        name: 'palettes',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renderer',
        outputs: [
            {
                internalType: 'contract ISVGRenderer',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract INounsArt',
                name: '_art',
                type: 'address',
            },
        ],
        name: 'setArt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'descriptor', type: 'address' },
        ],
        name: 'setArtDescriptor',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IInflator',
                name: 'inflator',
                type: 'address',
            },
        ],
        name: 'setArtInflator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string', name: '_baseURI', type: 'string' }],
        name: 'setBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint8', name: 'paletteIndex', type: 'uint8' },
            { internalType: 'bytes', name: 'palette', type: 'bytes' },
        ],
        name: 'setPalette',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint8', name: 'paletteIndex', type: 'uint8' },
            { internalType: 'address', name: 'pointer', type: 'address' },
        ],
        name: 'setPalettePointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ISVGRenderer',
                name: '_renderer',
                type: 'address',
            },
        ],
        name: 'setRenderer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'toggleDataURIEnabled',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            {
                components: [
                    {
                        internalType: 'uint48',
                        name: 'background',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'body', type: 'uint48' },
                    {
                        internalType: 'uint48',
                        name: 'accessory',
                        type: 'uint48',
                    },
                    { internalType: 'uint48', name: 'head', type: 'uint48' },
                    { internalType: 'uint48', name: 'glasses', type: 'uint48' },
                ],
                internalType: 'struct INounsSeeder.Seed',
                name: 'seed',
                type: 'tuple',
            },
        ],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateAccessories',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateAccessoriesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateBodies',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateBodiesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateGlasses',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateGlassesFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'encodedCompressed', type: 'bytes' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateHeads',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'pointer', type: 'address' },
            {
                internalType: 'uint80',
                name: 'decompressedLength',
                type: 'uint80',
            },
            { internalType: 'uint16', name: 'imageCount', type: 'uint16' },
        ],
        name: 'updateHeadsFromPointer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
]

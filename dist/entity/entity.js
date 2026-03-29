import superjson from 'superjson';
export function Entity() {
    return (Constructor) => {
        superjson.registerClass(Constructor);
    };
}
//# sourceMappingURL=entity.js.map
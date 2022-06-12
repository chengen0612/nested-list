/**
 * Convert data to nice indented component tree.
 * The structure of data items and child list items must be consistent.
 *
 * @param {array} data
 * Object array.
 * @param {Component} Item
 * Component for items rendering.
 * The component will receive two properties "item" and "depth" by default.
 * The "item" means current item,
 * and the "depth" means how deep is it from the root.
 * @param {string} recurseKey
 * The name of child list key.
 * @param {number} indentation
 * The number of indentation.
 * @param {number} depth
 * The depth of current list.
 * Default to 0 and increased by 1 after each recursion.
 * @param {object} rest
 * Any property not listed would be receive
 * and pass to each Item through this namespace internally.
 * @returns {Component}
 */

export default function NestedList({
  data,
  Item,
  recurseKey,
  indentation = 16,
  depth = 0,
  ...rest
}) {
  if (!recurseKey) {
    throw new Error("NestedList must have 'recurseKey' property");
  }

  return (
    <ul
      style={{
        marginLeft: depth > 0 && indentation,
        paddingLeft: "unset",
        listStyle: "none",
      }}
    >
      {data.map((item, index) => {
        const hasDescendent = item[recurseKey].length > 0;

        return (
          <li key={index}>
            <Item item={item} depth={depth} {...rest} />
            {hasDescendent && (
              <NestedList
                data={item[recurseKey]}
                Item={Item}
                recurseKey={recurseKey}
                indentation={indentation}
                depth={depth + 1}
                {...rest}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

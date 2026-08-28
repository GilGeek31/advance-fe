// Convert dari object JS biasa → format Firestore REST
function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === "object") {
    return { mapValue: { fields: toFirestoreFields(value) } };
  }
  return { stringValue: String(value) };
}

export function toFirestoreFields(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, toFirestoreValue(value)]),
  );
}

// Convert dari format Firestore REST → object JS biasa
function fromFirestoreValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("mapValue" in value)
    return fromFirestoreFields(value.mapValue.fields || {});
  if ("arrayValue" in value)
    return (value.arrayValue.values || []).map(fromFirestoreValue);
  return null;
}

function fromFirestoreFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      fromFirestoreValue(value),
    ]),
  );
}

export function fromFirestoreDocument(doc) {
  const id = doc.name.split("/").pop(); // ambil id dari akhir path "projects/.../documents/courses/xxx"
  return { id, ...fromFirestoreFields(doc.fields || {}) };
}

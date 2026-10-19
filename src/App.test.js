import { content } from "./content";

test("content ships both languages with mirrored structure", () => {
  expect(content.en).toBeTruthy();
  expect(content.ar).toBeTruthy();
  expect(content.en.dir).toBe("ltr");
  expect(content.ar.dir).toBe("rtl");
  expect(content.ar.services.items).toHaveLength(content.en.services.items.length);
});

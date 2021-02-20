import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// Build a custom sidebar
export default function sidebar() {
  return S.list().title(`Slick's Slices`).items([
    // Create new sub item
    S.listItem()
      .title('Home Page').icon(() => <strong>🔥</strong>)
      .child(
        S.editor()
          .schemaType('storeSettings')
          // Make a new document ID, so we don't have a random strinf of numbers
          .documentId('downtown')
      ),
      // Add in the rest of our document items
      ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings')
  ]);
};
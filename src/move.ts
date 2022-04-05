type Folder = {
  id: string;
  name: string;
  files: File[];
};

type File = {
  id: string;
  name: string;
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // Define source file for scope
  let sourceFile: File | undefined;

  list.forEach((folder) => {
    // Check if the source is a folder or not
    if (folder.id === source) throw new Error('You cannot move a folder');
    folder.files.forEach((file, i) => {
      if (file.id === source) {
        // Assign the file to sourceFile
        sourceFile = file;
        // Remove the file from folder
        folder.files.splice(i, 1);

        // Check if the destination is a file or not
      } else if (file.id === destination)
        throw new Error('You cannot specify a file as the destination');
    });
  });

  // Index of the destination folder
  const indexOfDest = list.findIndex((folder) => folder.id === destination);

  // Check if we got the destination folder or not
  if (indexOfDest < 0) throw new Error('The destination is not found');

  // Check if we got the sourceFile or not
  if (!sourceFile) throw new Error('The source is not found');

  // Add source file to the destination folder
  list[indexOfDest].files.push(sourceFile);

  return list;
}

import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

function getAllFiles(dirPath, arrayOfFiles = []) {
   const files = fs.readdirSync(dirPath)

   files.forEach(file => {
      const fullPath = path.join(dirPath, file)
      if (fs.statSync(fullPath).isDirectory()) {
         arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
      } else if (/\.(html|css|js)$/.test(file)) {
         arrayOfFiles.push(fullPath)
      }
   })

   return arrayOfFiles
}

async function formatFiles() {
   const files = getAllFiles('dist')
   console.log(`Знайдено ${files.length} файлів для форматування`)

   for (const file of files) {
      try {
         const content = fs.readFileSync(file, 'utf8')
         const options = (await prettier.resolveConfig(file)) || {}
         const formatted = await prettier.format(content, {
            ...options,
            filepath: file,
         })

         if (content !== formatted) {
            fs.writeFileSync(file, formatted)
            console.log(`✓ ${file}`)
         } else {
            console.log(`- ${file} (без змін)`)
         }
      } catch (error) {
         console.error(`✗ Помилка в ${file}:`, error.message)
      }
   }

   console.log('\n✅ Форматування завершено!')
}

formatFiles()

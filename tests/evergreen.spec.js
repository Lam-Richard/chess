import { test } from '@playwright/test';

test.describe('Chess App Evergreen Game', () => {
    test('plays the full Evergreen Game', async ({ page }) => {
        await page.goto('http://localhost:3000'); 

        async function movePiece(fromRow, fromCol, toRow, toCol) {
            await page.click(`[data-row="${fromRow}"][data-col="${fromCol}"]`);
            await page.waitForTimeout(100);
            await page.click(`[data-row="${toRow}"][data-col="${toCol}"]`);
            await page.waitForTimeout(100);
        }

        // 1. e4 e5
        await movePiece(6, 4, 4, 4); 
        await movePiece(1, 4, 3, 4);  

        // 2. Nf3 Nc6
        await movePiece(7, 6, 5, 5); 
        await movePiece(0, 1, 2, 2); 

        // 3. Bc4 Bc5
        await movePiece(7, 5, 4, 2);  
        await movePiece(0, 5, 3, 2);  

        // 4. b4 Bxb4
        await movePiece(6, 1, 4, 1); 
        await movePiece(3, 2, 4, 1); 

        // 5. c3 Ba5
        await movePiece(6, 2, 5, 2);  
        await movePiece(4, 1, 3, 0);  

        // 6. d4 exd4
        await movePiece(6, 3, 4, 3); 
        await movePiece(3, 4, 4, 3); 

        // 7. O-O d3
        await movePiece(7, 4, 7, 6);
        await movePiece(4, 3, 5, 3);

        // 8. Qb3 Qf6
        await movePiece(7, 3, 5, 1);
        await movePiece(0, 3, 2, 5);

        // 9. e5 Qg6
        await movePiece(4, 4, 3, 4); 
        await movePiece(2, 5, 2, 6);

        // 10. Re1 Nge7
        await movePiece(7, 5, 7, 4); 
        await movePiece(0, 6, 1, 4); 

        // 11. Ba3 b5
        await movePiece(7, 2, 5, 0); 
        await movePiece(1, 1, 3, 1); 

        // 12. Qxb5 Rb8
        await movePiece(5, 1, 3, 1); 
        await movePiece(0, 0, 0, 1); 

        // 13. Qa4 Bb6
        await movePiece(3, 1, 4, 0); 
        await movePiece(3, 0, 2, 1); 

        // 14. Nbd2 Bb7
        await movePiece(7, 1, 6, 3); 
        await movePiece(0, 2, 1, 1); 

        // 15. Ne4 Qf5
        await movePiece(6, 3, 4, 4); 
        await movePiece(2, 6, 3, 5); 

        // 16. Bxd3 Qh5
        await movePiece(4, 2, 5, 3); 
        await movePiece(3, 5, 3, 7);

        // 17. Nf6+ gxf6
        await movePiece(4, 4, 2, 5); 
        await movePiece(1, 6, 2, 5); 

        // 18. exf6 Rg8
        await movePiece(3, 4, 2, 5); 
        await movePiece(0, 7, 0, 6); 

        // 19. Rad1 Qxf3
        await movePiece(7, 0, 7, 3); 
        await movePiece(3, 7, 5, 5); 

        // 20. Rxe7+ Nxe7
        await movePiece(7, 4, 1, 4);
        await movePiece(2, 2, 1, 4);

        // 21. Qxd7+ Kxd7
        await movePiece(4, 0, 1, 3);
        await movePiece(0, 4, 1, 3); 

        // 22. Bf5+ Ke8
        await movePiece(5, 3, 3, 5); 
        await movePiece(1, 3, 0, 4); 

        // 23. Bd7+ Kf8
        await movePiece(3, 5, 1, 3);
        await movePiece(0, 4, 0, 5);

        // 24. Bxe7#
        await movePiece(5, 0, 1, 4)
    });
});

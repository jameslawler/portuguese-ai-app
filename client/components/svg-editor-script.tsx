export const getSvgEditorScript = (nodes: string) => `
  function svgEditor() {
      return {
        options: [
          { group: 'node', type: 'title', x: 20, y: 20, width: 120, height: 40, color: 'white', stroke: 'white', message: 'Title' },
          { group: 'node', type: 'unit', x: 20, y: 80, width: 120, height: 40, color: 'lightblue', stroke: 'black', message: 'Unit' },
          { group: 'node', type: 'lesson', x: 20, y: 140, width: 120, height: 40, color: 'lightgreen', stroke: 'black', message: 'Lesson' },
          { group: 'line', type: 'line-horizontal', x: 20, y: 200, width: 120, height: 40, color: 'yellow', stroke: 'black', message: 'Line-X' },
        ],
        nodes: ${nodes},
        lines: [],
        dragging: false,
        resizing: false,
        dragType: 'move',
        dragIndex: null,
        isAllowedOutOfBound: false,
        offsetX: 0,
        offsetY: 0,
        gridSize: 20,
        startDrag(index, event, isAllowedOutOfBound = false, dragType) {
          this.dragging = true;
          this.dragIndex = index;
          this.dragType = dragType;
          this.isAllowedOutOfBound = isAllowedOutOfBound;

          // Calculate mouse offset inside the node
          const node = this.nodes[index];

          if (dragType === 'move') {
            this.offsetX = event.offsetX - (node.x || node.x1);
            this.offsetY = event.offsetY - (node.y || node.y1);
          }

          if (dragType === 'resizeLeft') {
            this.offsetX = event.offsetX - node.x1;
            this.offsetY = event.offsetY - node.y1;
          }

          if (dragType === 'resizeRight') {
            this.offsetX = event.offsetX - node.x2;
            this.offsetY = event.offsetY - node.y2;
          }
        },
        createAndDrag(optionIndex, event) {
          const option = this.options[optionIndex];

          if (option.group === 'node') {
            this.nodes.push({
              type: option.type,
              x: -160,
              y: option.y,
              width: option.width,
              height: option.height,
              color: option.color,
              stroke: option.stroke,
              message: 'new node',
              resourceId: '',
              lessonId: ''
            });
          }

          if (option.group === 'line') {
            this.nodes.push({
              type: option.type,
              x1: -160,
              y1: option.y + (option.height / 2),
              x2: option.width - 160,
              y2: option.y + (option.height / 2),
              color: option.color,
              stroke: option.stroke,
              lineType: 'dotted'
            });
          }
          
          this.startDrag(this.nodes.length - 1, event, true, 'move');
        },
        dragNode(event) {
          if (!this.dragging || this.dragIndex === null) {
            return;
          }
          
          if (this.dragType === 'move') {
            let newX = event.offsetX - this.offsetX;
            let newY = event.offsetY - this.offsetY;

            // Snap to nearest grid
            newX = Math.round(newX / this.gridSize) * this.gridSize;
            newY = Math.round(newY / this.gridSize) * this.gridSize;

            // Check bounds of map
            const node = this.nodes[this.dragIndex];

            if (this.isAllowedOutOfBound && newX > 0 && newY > 0) {
              this.isAllowedOutOfBound = false;
            }

            if (!this.isAllowedOutOfBound) {
              newX = newX < 0 ? 0 : newX
              newY = newY < 0 ? 0 : newY
            }

            newX = newX > (960 - node.width) ? (960 - node.width) : newX
            newY = newY > (960 - node.height) ? (960 - node.height) : newY

            if (this.nodes[this.dragIndex].type !== 'line-horizontal') {
              this.nodes[this.dragIndex].x = newX;
              this.nodes[this.dragIndex].y = newY;
            } else {
              const xDiff = this.nodes[this.dragIndex].x1 - newX;
              const yDiff = this.nodes[this.dragIndex].y1 - newY;

              this.nodes[this.dragIndex].x1 = newX;
              this.nodes[this.dragIndex].y1 = newY;
              this.nodes[this.dragIndex].x2 = this.nodes[this.dragIndex].x2 - xDiff;
              this.nodes[this.dragIndex].y2 = this.nodes[this.dragIndex].y2 - yDiff;
            }
          }

          if (this.dragType === 'resizeLeft') {
            let newX = event.offsetX - this.offsetX;
            let newY = event.offsetY - this.offsetY;

            // Snap to nearest grid
            newX = Math.round(newX / this.gridSize) * this.gridSize;
            newY = Math.round(newY / this.gridSize) * this.gridSize;

            // Check bounds of map
            const node = this.nodes[this.dragIndex];

            if (this.isAllowedOutOfBound && newX > 0 && newY > 0) {
              this.isAllowedOutOfBound = false;
            }

            if (!this.isAllowedOutOfBound) {
              newX = newX < 0 ? 0 : newX
              newY = newY < 0 ? 0 : newY
            }

            newX = newX > (960 - node.width) ? (960 - node.width) : newX
            newY = newY > (960 - node.height) ? (960 - node.height) : newY

            this.nodes[this.dragIndex].x1 = newX;
            this.nodes[this.dragIndex].y1 = newY;
          }

          if (this.dragType === 'resizeRight') {
            let newX = event.offsetX - this.offsetX;
            let newY = event.offsetY - this.offsetY;

            // Snap to nearest grid
            newX = Math.round(newX / this.gridSize) * this.gridSize;
            newY = Math.round(newY / this.gridSize) * this.gridSize;

            // Check bounds of map
            const node = this.nodes[this.dragIndex];

            if (this.isAllowedOutOfBound && newX > 0 && newY > 0) {
              this.isAllowedOutOfBound = false;
            }

            if (!this.isAllowedOutOfBound) {
              newX = newX < 0 ? 0 : newX
              newY = newY < 0 ? 0 : newY
            }

            newX = newX > (960 - node.width) ? (960 - node.width) : newX
            newY = newY > (960 - node.height) ? (960 - node.height) : newY

            this.nodes[this.dragIndex].x2 = newX;
            this.nodes[this.dragIndex].y2 = newY;
          }
        },
        endDrag(event) {
          this.dragging = false;

          if (this.nodes[this.dragIndex].x < 0 || this.nodes[this.dragIndex].y < 0) {
            this.nodes.splice(this.dragIndex, 1);
          }
        }
      }
    }
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll('svg template').forEach(el => {
        const template = el.ownerDocument.createElement('template');
        for (const attr of el.attributes) 
          template.setAttributeNode(attr.cloneNode())
        template.content.append(...el.children)
        el.replaceWith(template)
      })
    });
  `;

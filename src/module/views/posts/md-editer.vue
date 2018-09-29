<template>
    <div class="md-editer">
        <textarea ref="editer"></textarea>
    </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/railscasts.css'
import 'assets/less/markdown.css'
window.hljs = hljs;
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'inline-attachment/src/inline-attachment'
import 'inline-attachment/src/codemirror-4.inline-attachment'
export default {
    name: 'md-editer',
    data() {
        return {
            simpleMd: null,
            content: this.value
        }
    },
    mounted(){
        this.init();
    },
    props:{
        value: {
            type: String,
            default: ''
        }
    },
    methods: { 
        init(){
            this.simpleMd = new SimpleMDE({ 
                element: this.$refs.editer, 
                status: false,
                placeholder: '请输入Markdown语法的内容',
                renderingConfig: {
                    singleLineBreaks: false,
                    codeSyntaxHighlighting: true,
                }
            });
            this.simpleMd.value(this.content);
            this.simpleMd.codemirror.on("change", ()=>{
                this.$emit('input', this.simpleMd.value());
            });
            this.initUploadFile();
        },
        initUploadFile(){
            inlineAttachment.editors.codemirror4.attach(this.simpleMd.codemirror, {
                uploadUrl: '/actfiles',
                progressText:'![uploading file...]()',
                urlText:'![]({filename})',
                errorText:'Error uploading file',
                uploadFieldName:'upfile',
                onFileUploadResponse: function(xhr) {
                    var result = JSON.parse(xhr.responseText),
                    filename = `http://file.micaiah.cn/${result.data.path}`;
                    if (result && filename) {
                        var newValue;
                        if (typeof this.settings.urlText === 'function') {
                            newValue = this.settings.urlText.call(this, filename, result);
                        } else {
                            newValue = this.settings.urlText.replace(this.filenameTag, filename);
                        }
                        var text = this.editor.getValue().replace(this.lastValue, newValue);
                        this.editor.setValue(text);
                        this.settings.onFileUploaded.call(this, filename);
                    }
                    return false;
                },
                onFileUploadError:function(data){
                    console.log('err',data);
                }
            });
        }
    }
}
</script>


<style  lang="less">
     .CodeMirror, .CodeMirror-scroll {
        min-height: 200px;
    }
</style>
